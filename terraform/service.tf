resource "aws_ecs_service" "flask_react_be_service" {
  name            = "flask-react-be-service"
  cluster         = aws_ecs_cluster.my-ecs-cluster.id
  task_definition = aws_ecs_task_definition.flask-react-be-td.arn
  desired_count   = 1
  launch_type     = "EC2"

  load_balancer {
    target_group_arn = aws_alb_target_group.ecstargetgroupbe.arn
    container_name   = "backend"
    container_port   = 5000
  }

  tags = {
    Name = "flask-react-be-service"
  }
}

resource "aws_ecs_service" "flask_react_fe_service" {
  name            = "flask-react-fe-service"
  cluster         = aws_ecs_cluster.my-ecs-cluster.id
  task_definition = aws_ecs_task_definition.flask-react-fe-td.arn
  desired_count   = 1
  launch_type     = "EC2"

  load_balancer {
    target_group_arn = aws_alb_target_group.ecstargetgroupfe.arn
    container_name   = "frontend"
    container_port   = 80
  }

  tags = {
    Name = "flask-react-fe-service"
  }
}

# resource "aws_ecs_service" "redis_service" {
#   name            = "redis-service"
#   cluster         = aws_ecs_cluster.my-ecs-cluster.id
#   task_definition = aws_ecs_task_definition.flask-react-redis-td.arn
#   desired_count   = 1
#   launch_type     = "EC2"

#   load_balancer {
#     target_group_arn = aws_alb_target_group.ecstargetgroupbe.arn
#     container_name   = "redis" 
#     container_port   = 6379
#   }

#   tags = {
#     Name = "redis-service"
#   }
# }