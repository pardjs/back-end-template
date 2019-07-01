version: '2'
services:
  ${projectName}-${serviceName}:
    container_name: ${projectName}-${serviceName}
    image: registry.cn-shanghai.aliyuncs.com/${projectName}/${serviceName}:${appVersion}
    ports:
      - "${servicePort}:80"
    volumes:
      - "./logs:/var/log/nginx/log.log"
    env_file:
      - .env
