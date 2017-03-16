variable "access_key" {}
variable "secret_key" {}

variable "region" {
  default = "us-east-1"
}

variable "dns_server_ip" {
  type = "string"
}

variable "domain" {
  type    = "string"
  default = "paralelstudios.com"
}

variable "domain_mail" {
  type    = "string"
  default = "mail.paralelstudios.com"
}

variable "domain_www" {
  type    = "string"
  default = "www.paralelstudios.com"
}

provider "aws" {
  access_key = "${var.access_key}"
  secret_key = "${var.secret_key}"
  region     = "${var.region}"
}

resource "aws_s3_bucket" "paralel" {
  bucket = "${var.domain}"
  acl    = "public-read"

  website {
    index_document = "index.html"
  }
}

resource "aws_route53_zone" "paralel" {
  name = "${var.domain}"
}

resource "aws_route53_record" "paralel" {
  zone_id = "${aws_route53_zone.paralel.zone_id}"
  ttl     = "14400"
  name    = "${var.domain}"
  type    = "A"
  records = ["${var.dns_server_ip}"]
}

resource "aws_route53_record" "localhost" {
  zone_id = "${aws_route53_zone.paralel.zone_id}"
  ttl     = "14400"
  name    = "localhost"
  type    = "A"
  records = ["127.0.0.1"]
}

resource "aws_route53_record" "autoconfig" {
  zone_id = "${aws_route53_zone.paralel.zone_id}"
  ttl     = "14400"
  name    = "autoconfig"
  type    = "A"
  records = ["${var.dns_server_ip}"]
}

resource "aws_route53_record" "autodiscover" {
  zone_id = "${aws_route53_zone.paralel.zone_id}"
  ttl     = "14400"
  name    = "autodiscover"
  type    = "A"
  records = ["${var.dns_server_ip}"]
}

resource "aws_route53_record" "cpanel" {
  zone_id = "${aws_route53_zone.paralel.zone_id}"
  ttl     = "14400"
  name    = "cpanel"
  type    = "A"
  records = ["${var.dns_server_ip}"]
}

resource "aws_route53_record" "webdisk" {
  zone_id = "${aws_route53_zone.paralel.zone_id}"
  ttl     = "14400"
  name    = "webdisk"
  type    = "A"
  records = ["${var.dns_server_ip}"]
}

resource "aws_route53_record" "cpcalendars" {
  zone_id = "${aws_route53_zone.paralel.zone_id}"
  ttl     = "14400"
  name    = "cpcalendars"
  type    = "A"
  records = ["${var.dns_server_ip}"]
}

resource "aws_route53_record" "cpcontacts" {
  zone_id = "${aws_route53_zone.paralel.zone_id}"
  ttl     = "14400"
  name    = "cpcontacts"
  type    = "A"
  records = ["${var.dns_server_ip}"]
}

resource "aws_route53_record" "whm" {
  zone_id = "${aws_route53_zone.paralel.zone_id}"
  ttl     = "14400"
  name    = "whm"
  type    = "A"
  records = ["${var.dns_server_ip}"]
}

resource "aws_route53_record" "webmail" {
  zone_id = "${aws_route53_zone.paralel.zone_id}"
  ttl     = "14400"
  name    = "webmail"
  type    = "A"
  records = ["${var.dns_server_ip}"]
}

resource "aws_route53_record" "mail" {
  zone_id = "${aws_route53_zone.paralel.zone_id}"
  ttl     = "14400"
  name    = "mail"
  type    = "A"
  records = ["${var.dns_server_ip}"]
}

resource "aws_route53_record" "www" {
  zone_id = "${aws_route53_zone.paralel.zone_id}"
  ttl     = "14400"
  name    = "www"
  type    = "CNAME"
  records = ["${var.domain}"]
}

resource "aws_route53_record" "ftp" {
  zone_id = "${aws_route53_zone.paralel.zone_id}"
  ttl     = "14400"
  name    = "ftp"
  type    = "CNAME"
  records = ["${var.domain}"]
}

resource "aws_route53_record" "imap" {
  zone_id = "${aws_route53_zone.paralel.zone_id}"
  ttl     = "14400"
  name    = "imap"
  type    = "CNAME"
  records = ["${var.domain_mail}"]
}

resource "aws_route53_record" "pop" {
  zone_id = "${aws_route53_zone.paralel.zone_id}"
  ttl     = "14400"
  name    = "pop"
  type    = "CNAME"
  records = ["${var.domain_mail}"]
}

resource "aws_route53_record" "smtp" {
  zone_id = "${aws_route53_zone.paralel.zone_id}"
  ttl     = "14400"
  name    = "smtp"
  type    = "CNAME"
  records = ["${var.domain_mail}"]
}

resource "aws_route53_record" "zero" {
  zone_id = "${aws_route53_zone.paralel.zone_id}"
  ttl     = "14400"
  name    = "${var.domain}"
  type    = "MX"
  records = ["0 mail.paralelstudios.com"]
}

resource "aws_route53_record" "ten" {
  zone_id = "${aws_route53_zone.paralel.zone_id}"
  ttl     = "14400"
  name    = "${var.domain}"
  type    = "MX"
  records = ["10 paralelstudios.com"]
}

resource "aws_route53_record" "alias" {
  zone_id = "${aws_route53_zone.paralel.zone_id}"
  name    = "${var.domain}"
  type    = "A"

  alias {
    zone_id                = "${aws_s3_bucket.paralel.hosted_zone_id}"
    name                   = "${aws_s3_bucket.paralel.website_domain}"
    evaluate_target_health = true
  }
}
