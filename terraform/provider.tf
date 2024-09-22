# Setup our aws provider using aws configure authentication
provider "aws" {
region = "${var.region}"
}