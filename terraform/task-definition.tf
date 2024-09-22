data "aws_ecs_task_definition" "flask-react-be-td" {
task_definition = "${aws_ecs_task_definition.flask-react-be-td.family}"
}



resource "aws_ecs_task_definition" "flask-react-be-td" {
  family = "flask-react-be-td"

  container_definitions = jsonencode([
    {
      "name": "backend",
      "image": "211125510167.dkr.ecr.us-east-1.amazonaws.com/twtr-be:prod",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 5000,
          "hostPort": 0
        }
      ],
      "memory": 300,
      "cpu": 10,
      "environment": [
        {
          "name": "REDIS_HOST",
          "value": "redis"
        },
        {
          "name": "REDIS_PORT",
          "value": "6379"
        }
      ]
    },
    {
      "name": "redis",
      "image": "211125510167.dkr.ecr.us-east-1.amazonaws.com/twtr-redis:prod",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 6379,
          "hostPort": 0
        }
      ],
      "memory": 300,
      "cpu": 10
    }
  ])
}


data "aws_ecs_task_definition" "flask-react-fe-td" {
task_definition = "${aws_ecs_task_definition.flask-react-fe-td.family}"
}
resource "aws_ecs_task_definition" "flask-react-fe-td" {
family = "flask-react-fe-td"
container_definitions = <<DEFINITION
[
{
"name": "frontend",
"image": "211125510167.dkr.ecr.us-east-1.amazonaws.com/twtr-fe:prod",
"essential": true,
"portMappings": [
{
"containerPort": 80,
"hostPort": 0
}
],
"memory": 300,
"cpu": 10
}
]
DEFINITION
}


# data "aws_ecs_task_definition" "flask-react-redis-td" {
# task_definition = "${aws_ecs_task_definition.flask-react-redis-td.family}"
# }
# resource "aws_ecs_task_definition" "flask-react-redis-td" {
# family = "flask-react-redis-td"
# container_definitions = <<DEFINITION
# [
# {
# "name": "redis",
# "image": "211125510167.dkr.ecr.us-east-1.amazonaws.com/twtr-redis:prod",
# "essential": true,
# "portMappings": [
# {
# "containerPort": 6379,
# "hostPort": 0
# }
# ],
# "memory": 300,
# "cpu": 10
# }
# ]
# DEFINITION
# }
