# Load Balancer
resource "aws_alb" "ecs_load_balancer" {
  name               = "ecs-load-balancer"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.test_public_sg.id]
  subnets            = [aws_subnet.test_public_sn_01.id, aws_subnet.test_public_sn_02.id]
  tags = {
    Name = "ecs-load-balancer"
  }
}

# Target Group for Frontend
resource "aws_alb_target_group" "ecstargetgroupfe" {
  name     = "ecstargetgroupfe"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.test_vpc.id

  health_check {
    healthy_threshold   = 5
    unhealthy_threshold = 2
    interval            = 30
    matcher             = "200"
    path                = "/"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
  }

  tags = {
    Name = "ecstargetgroupfe"
  }
}

# Target Group for Backend
resource "aws_alb_target_group" "ecstargetgroupbe" {
  name     = "ecstargetgroupbe"
  port     = 5000
  protocol = "HTTP"
  vpc_id   = aws_vpc.test_vpc.id

  health_check {
    healthy_threshold   = 5
    unhealthy_threshold = 2
    interval            = 30
    matcher             = "200"
    path                = "/"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
  }

  tags = {
    Name = "ecstargetgroupbe"
  }
}

# Load Balancer Listener
resource "aws_alb_listener" "alb_listener" {
  load_balancer_arn = aws_alb.ecs_load_balancer.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.ecstargetgroupfe.arn
  }
}

# Listener Rule for Backend
resource "aws_lb_listener_rule" "static_be" {
  listener_arn = aws_alb_listener.alb_listener.arn
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.ecstargetgroupbe.arn
  }

  condition {
    path_pattern {
      values = ["/doc", "/tweet*", "/login", "/fastlogin"]
    }
  }
}
