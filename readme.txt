Tạo secret kiểu kubernetes.io/dockerconfigjson
Tạo file config.json
{
  "auths": {
    "https://index.docker.io/v1/": {
      "username": "YOUR_USERNAME",
      "password": "YOUR_PASSWORD",
      "email": "your@email.com",
      "auth": "BASE64(username:password)" // echo -n "YOUR_USERNAME:YOUR_PASSWORD" | base64
    }
  }
}

Encode file config.json
cat config.json | base64 -w 0

Bước 3: Tạo file secret.yaml

apiVersion: v1
kind: Secret
metadata:
  name: regcred
  namespace: your-namespace
type: kubernetes.io/dockerconfigjson
data:
  .dockerconfigjson: BASE64_CONFIG_JSON_HERE // here
