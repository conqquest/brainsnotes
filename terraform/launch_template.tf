data "aws_region" "current" {}

data "aws_ami" "amazon_linux" {
  most_recent = true

  owners = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-*-x86_64"]
  }

  filter {
    name   = "state"
    values = ["available"]
  }
}

resource "aws_launch_template" "app" {
  name_prefix   = "brains-app-"
  image_id      = data.aws_ami.amazon_linux.id
  instance_type = "t3.micro"

  iam_instance_profile {
    name = aws_iam_instance_profile.ec2_profile.name
  }

  vpc_security_group_ids = [
    aws_security_group.backend.id
  ]

  user_data = base64encode(<<-EOF
    #!/bin/bash

    dnf update -y

    dnf install -y docker

    systemctl enable docker
    systemctl start docker

    aws ecr get-login-password --region ${data.aws_region.current.region} | \
      docker login --username AWS --password-stdin ${aws_ecr_repository.backend.repository_url}

    docker pull ${aws_ecr_repository.backend.repository_url}:latest
    docker pull ${aws_ecr_repository.frontend.repository_url}:latest

    docker rm -f brains-backend || true
    docker rm -f brains-frontend || true

    docker run -d \
      --name brains-backend \
      --restart unless-stopped \
      -p 5000:5000 \
      -e PORT=5000 \
      -e MONGO_URI='${var.mongo_uri}' \
      -e JWT_SECRET='${var.jwt_secret}' \
      ${aws_ecr_repository.backend.repository_url}:latest

    docker run -d \
      --name brains-frontend \
      --restart unless-stopped \
      -p 80:80 \
      ${aws_ecr_repository.frontend.repository_url}:latest
  EOF
  )

  tag_specifications {
    resource_type = "instance"

    tags = {
      Name = "brains-app-server"
    }
  }

  tags = {
    Name = "brains-launch-template"
  }
}