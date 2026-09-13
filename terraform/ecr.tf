resource "aws_ecr_repository" "backend" {
  name                 = "brains-backend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "brains-backend"
  }
}

resource "aws_ecr_repository" "frontend" {
  name                 = "brains-frontend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "brains-frontend"
  }
}