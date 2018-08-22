#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

fs.writeFile('secrets.json', `{
 "type": "service_account",
 "project_id": "test1-211018",
 "private_key_id": "${process.env.private_key_id}",
 "private_key": "-----BEGIN PRIVATE KEY-----\\n${process.env.private_key}\\n-----END PRIVATE KEY-----\\n",
 "client_email": "whats-that@test1-211018.iam.gserviceaccount.com",
 "client_id": "103346616138126366479",
 "auth_uri": "https://accounts.google.com/o/oauth2/auth",
 "token_uri": "https://oauth2.googleapis.com/token",
 "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
 "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/whats-that%40test1-211018.iam.gserviceaccount.com"
}`, (err) => {if (err) throw err})

process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(process.cwd(), 'secrets.json')
fs.writeFile('secrets.js', '', (err) => {if (err) throw err})

