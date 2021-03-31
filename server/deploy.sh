#!/bin/bash

echo What should the version be ?
read VERSION

docker build -t bastiendmt/lireddit:$VERSION .
docker push bastiendmt/lireddit:$VERSION