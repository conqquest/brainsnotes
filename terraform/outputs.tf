output "vpc_id" {
  value = aws_vpc.main.id
}

output "alb_dns_name" {
  value = aws_lb.main.dns_name
}

output "ecr_backend_repository" {
  value = aws_ecr_repository.backend.repository_url
}

output "ecr_frontend_repository" {
  value = aws_ecr_repository.frontend.repository_url
}

output "availability_zones" {
  value = data.aws_availability_zones.available.names
}

