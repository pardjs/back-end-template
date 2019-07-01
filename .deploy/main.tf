// TF_VAR_serverUser
variable "serverUser" {
  type        = "string"
  description = "the user on server used to deploy"
  default     = "root"
}

// Private key should be added on CI tools
// TF_VAR_serverUserPrivateKeyPath
variable "serverUserPrivateKeyPath" {
  type        = "string"
  description = "the private key for the user"
  default     = "~/.ssh/id_rsa"
}

// TF_VAR_serverUserPrivateKeyPath
variable "serverUserPrivateKey" {
  type        = "string"
  description = "the private key for the user"
  default     = ""
}

variable "appVersion" {
  type        = "string"
  description = "the version of current application"
  default     = "latest"
}

variable "projectName" {
  type        = "string"
  description = "the name of this service for container and folder etc."
  default     = "pardjs"
}

variable "serviceName" {
  type        = "string"
  description = "the name of this service for container and folder etc."
  default     = "front-end-template"
}

data "template_file" "docker_compose_file" {
  template = "${file(".deploy/docker-compose.yaml.tpl")}"

  vars {
    appVersion  = "${var.appVersion}"
    servicePort = "${var.servicePort}"
    projectName = "${var.projectName}"
    serviceName = "${var.serviceName}"
  }
}

resource "null_resource" "docker_compose" {
  connection {
    host = "${var.serverHost}"
    user = "${var.serverUser}"

    private_key = "${
      length(var.serverUserPrivateKey) > 0
      ? var.serverUserPrivateKey
      : file(var.serverUserPrivateKeyPath)
    }"
  }

  provisioner "remote-exec" {
    inline = ["mkdir -p /root/deploy/${var.projectName}/${var.serviceName}"]
  }

  provisioner "file" {
    content     = "${data.template_file.docker_compose_file.rendered}"
    destination = "/root/deploy/${var.projectName}/${var.serviceName}/docker-compose.yaml"
  }

  provisioner "remote-exec" {
    inline = [
      "docker-compose -f /root/deploy/${var.projectName}/${var.serviceName}/docker-compose.yaml up -d",
    ]
  }
}

// TF_VAR_serverHost
variable "serverHost" {
  type        = "string"
  description = "the server host to deploy"
  default     = "devops.do021.com"
}

variable "servicePort" {
  type        = "string"
  description = "which port the service will expose on server"
  default     = "30012"
}

output "file_content" {
  value = "${data.template_file.docker_compose_file.rendered}"
}
