#!/bin/bash

# Exit the script on any error
set -e

function print_success {
  echo "===================================================="
  echo "$1 completed successfully!"
  echo "===================================================="
}

read -p "Enter root user email: " ZO_ROOT_USER_EMAIL
read -s -p "Enter root user password: " ZO_ROOT_USER_PASSWORD
echo ""  # Print a newline after password input

echo "Downloading and running OpenObserve setup..."
curl -L https://raw.githubusercontent.com/openobserve/openobserve/main/download.sh | sh
print_success "OpenObserve setup"

echo "Starting OpenObserve with root user credentials..."

export ZO_ROOT_USER_EMAIL
export ZO_ROOT_USER_PASSWORD
nohup ./openobserve > openobserve.log 2>&1 & disown
print_success "OpenObserve started (running in the background, logs redirected to openobserve.log)"

echo "Downloading sample Kubernetes logs..."
curl -L https://zinc-public-data.s3.us-west-2.amazonaws.com/zinc-enl/sample-k8s-logs/k8slog_json.json.zip -o k8slog_json.json.zip
print_success "Kubernetes logs downloaded"

echo "Unzipping Kubernetes logs..."
unzip -o k8slog_json.json.zip
print_success "Kubernetes logs unzipped"

echo "Waiting for 10 seconds to ensure OpenObserve is ready..."
sleep 10

echo "Pushing logs to OpenObserve..."
curl http://localhost:5080/api/default/default/_json -i -u "$ZO_ROOT_USER_EMAIL:$ZO_ROOT_USER_PASSWORD" -d "@k8slog_json.json"
print_success "Logs pushed to OpenObserve"

echo "===================================================="
echo "Setup completed successfully!"
echo "You can access OpenObserve at: http://localhost:5080"
echo "Root User Email: $ZO_ROOT_USER_EMAIL"
echo "Root User Password: $ZO_ROOT_USER_PASSWORD"
echo "===================================================="

