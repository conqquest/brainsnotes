resource "aws_cloudwatch_log_group" "app" {
  name              = "/brains/application"
  retention_in_days = 7

  tags = {
    Name = "brains-cloudwatch"
  }
}

resource "aws_autoscaling_policy" "cpu" {
  name                   = "brains-cpu-scaling"
  autoscaling_group_name = aws_autoscaling_group.app.name

  policy_type = "TargetTrackingScaling"

  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ASGAverageCPUUtilization"
    }

    target_value = 60
  }
}
