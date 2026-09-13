variable "mongo_uri" {
  description = "MongoDB Atlas connection string"
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "JWT secret used by the backend"
  type        = string
  sensitive   = true
}
