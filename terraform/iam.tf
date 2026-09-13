# IAM Role for EC2
resource "aws_iam_role" "ec2_role" {
  name = "brains-ec2-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Principal = {
          Service = "ec2.amazonaws.com"
        }

        Action = "sts:AssumeRole"
      }
    ]
  })

  tags = {
    Name = "brains-ec2-role"
  }
}

# Allow EC2 to pull Docker images from ECR
resource "aws_iam_role_policy_attachment" "ecr_read_only" {
  role       = aws_iam_role.ec2_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

# Instance Profile - attaches the IAM Role to EC2
resource "aws_iam_instance_profile" "ec2_profile" {
  name = "brains-ec2-profile"
  role = aws_iam_role.ec2_role.name
}