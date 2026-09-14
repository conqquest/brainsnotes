<p align="center">
  <img src="https://img.shields.io/badge/AWS-Architected-FF9900?style=for-the-badge&logo=amazon-web-services&logoColor=white" alt="AWS Architected"/>
  <img src="https://img.shields.io/badge/Terraform-IaC-7B42BC?style=for-the-badge&logo=terraform&logoColor=white" alt="Terraform"/>
  <img src="https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
  <img src="https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" alt="GitHub Actions"/>
</p>

# 🧠 Brains — Highly Available Cloud Architecture

> **Case Study: Designing a Highly Available Web Architecture Ready for Automated Deployment**

A full-stack note management application deployed on a **production-grade AWS infrastructure** featuring high availability across multiple Availability Zones, auto-scaling, containerized deployments, infrastructure-as-code, and CI/CD automation — designed, built, and experimentally verified from the ground up.

---

## 📐 Architecture

```
                          ┌─────────────────┐
                          │    INTERNET      │
                          └────────┬────────┘
                                   │
                          ┌────────▼────────┐
                          │  Application    │
                          │  Load Balancer  │
                          │  (ALB :80)      │
                          └────────┬────────┘
                                   │
               ┌───────────────────┴───────────────────┐
               │              VPC 10.0.0.0/16          │
               │                                       │
               │   ┌─── AZ-a ──────┐  ┌── AZ-b ──────┐│
               │   │ Public Subnet │  │ Public Subnet ││
               │   │   (ALB)       │  │   (ALB)       ││
               │   └───────────────┘  └───────────────┘│
               │                                       │
               │   ┌─── AZ-a ──────┐  ┌── AZ-b ──────┐│
               │   │Private Subnet │  │Private Subnet ││
               │   │               │  │               ││
               │   │ ┌───────────┐ │  │ ┌───────────┐ ││
               │   │ │  EC2 #1   │ │  │ │  EC2 #2   │ ││
               │   │ │ ┌───────┐ │ │  │ │ ┌───────┐ │ ││
               │   │ │ │Nginx  │ │ │  │ │ │Nginx  │ │ ││
               │   │ │ │ :80   │ │ │  │ │ │ :80   │ │ ││
               │   │ │ ├───────┤ │ │  │ │ ├───────┤ │ ││
               │   │ │ │Node.js│ │ │  │ │ │Node.js│ │ ││
               │   │ │ │ :5000 │ │ │  │ │ │ :5000 │ │ ││
               │   │ │ └───────┘ │ │  │ │ └───────┘ │ ││
               │   │ └───────────┘ │  │ └───────────┘ ││
               │   │   NAT GW ↑   │  │   NAT GW ↑   ││
               │   └───────────────┘  └───────────────┘│
               └───────────────────┬───────────────────┘
                                   │
                          ┌────────▼────────┐
                          │  MongoDB Atlas  │
                          │  (Managed DB)   │
                          └─────────────────┘
```

**Each EC2 instance runs two Docker containers:**
- **Nginx** — serves the React SPA and reverse-proxies `/api` requests
- **Node.js/Express** — handles API requests and communicates with MongoDB Atlas

---

## 🎯 Key Features

### Application
- 🔐 **JWT Authentication** — secure user registration and login
- 📝 **Content Management** — create, read, delete notes and learning materials
- 🔗 **Brain Sharing** — share your content via unique public links
- 📱 **Responsive UI** — mobile-first design with Tailwind CSS

### Infrastructure
- 🏗️ **High Availability** — multi-AZ deployment with automatic failover
- 📈 **Auto Scaling** — scales from 2 to 4 instances based on CPU utilization
- 🔄 **Rolling Deployments** — zero-downtime updates via ASG instance refresh
- 🐳 **Containerized** — Docker multi-stage builds with Nginx reverse proxy
- 🏭 **Infrastructure as Code** — entire AWS stack defined in Terraform
- 📊 **Monitoring** — CloudWatch metrics, alarms, and centralized logging
- 🔒 **Security** — private subnets, security groups, SSM Parameter Store for secrets

---

## 🛠️ Tech Stack

<table>
<tr>
<td width="50%">

### Frontend
| Technology | Purpose |
|:-----------|:--------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite 6 | Build tooling |
| Tailwind CSS | Styling |
| React Router v7 | Client-side routing |
| Axios | HTTP client |
| Lucide React | Icon library |

</td>
<td width="50%">

### Backend
| Technology | Purpose |
|:-----------|:--------|
| Node.js 22 | Runtime |
| Express 4 | Web framework |
| TypeScript | Type safety |
| Mongoose 8 | MongoDB ODM |
| JWT | Authentication |
| CORS | Cross-origin support |

</td>
</tr>
<tr>
<td>

### Infrastructure
| Technology | Purpose |
|:-----------|:--------|
| Terraform v1.16+ | Infrastructure as Code |
| AWS Provider v6.x | AWS resource management |
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| Nginx | Reverse proxy + static serving |

</td>
<td>

### AWS Services
| Service | Purpose |
|:--------|:--------|
| VPC | Network isolation |
| ALB | Load balancing |
| EC2 + ASG | Compute with auto-scaling |
| ECR | Container image registry |
| NAT Gateway | Outbound internet for private subnets |
| CloudWatch | Monitoring and alarms |
| SSM Parameter Store | Secrets management |
| IAM | Access control |

</td>
</tr>
</table>

---

## 📂 Project Structure

```
brains-main/
│
├── 📁 frontend/                  # React SPA (Vite + TypeScript)
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── landing/          # Landing page sections
│   │   │   ├── Card.tsx          # Content card component
│   │   │   ├── CreateContentModal.tsx
│   │   │   ├── Sidebar.tsx       # Navigation sidebar
│   │   │   └── ...
│   │   ├── pages/                # Route pages
│   │   │   ├── dashboard.tsx     # Main dashboard
│   │   │   ├── Share.tsx         # Public shared brain view
│   │   │   ├── Signin.tsx        # Authentication
│   │   │   └── ...
│   │   ├── hooks/                # Custom React hooks
│   │   ├── icons/                # SVG icon components
│   │   ├── utils/                # API helpers and utilities
│   │   └── config.ts             # Environment configuration
│   ├── Dockerfile                # Multi-stage build (Node → Nginx)
│   └── nginx.conf                # Reverse proxy configuration
│
├── 📁 backend/                   # Express API (TypeScript)
│   ├── src/
│   │   ├── controllers/          # Route handlers
│   │   │   ├── authController.ts # Signup/signin logic
│   │   │   └── userController.ts # Content CRUD + sharing
│   │   ├── middleware/           # Auth middleware (JWT verification)
│   │   ├── models/               # Mongoose schemas
│   │   ├── routes/               # Express route definitions
│   │   ├── utils/                # DB connection, cron, helpers
│   │   └── index.ts              # Server entry point
│   └── Dockerfile                # Production build container
│
├── 📁 terraform/                 # Infrastructure as Code
│   ├── provider.tf               # AWS provider configuration
│   ├── vpc.tf                    # VPC (10.0.0.0/16)
│   ├── subnets.tf                # Public + private subnets (2 AZs)
│   ├── internet.tf               # Internet Gateway
│   ├── nat.tf                    # NAT Gateway for private subnets
│   ├── routes.tf                 # Public route tables
│   ├── private_routes.tf         # Private route tables → NAT
│   ├── security.tf               # Security groups (ALB + EC2)
│   ├── ecr.tf                    # ECR repositories (frontend + backend)
│   ├── iam.tf                    # EC2 IAM role + instance profile
│   ├── alb.tf                    # ALB + target groups + listeners
│   ├── launch_template.tf        # EC2 launch template + user data
│   ├── autoscaling.tf            # ASG (min:2, max:4)
│   ├── cloudwatch.tf             # Metrics and alarms
│   ├── variables.tf              # Input variables
│   ├── outputs.tf                # Key outputs (ALB DNS, ECR URLs)
│   └── terraform.tfvars          # Variable values (⚠️ gitignored)
│
├── 📁 .github/workflows/        # CI/CD Pipeline
│   └── build.yml                 # Build + lint + test
│
├── docker-compose.yml            # Local development orchestration
├── .gitignore                    # Security: excludes secrets/state
└── README.md
```

---

## 🧪 API Reference

All API endpoints are prefixed with the backend URL. In production, Nginx reverse-proxies `/api` to the backend container.

### Authentication

| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:-----|
| `POST` | `/api/v1/user/signup` | Register a new user | — |
| `POST` | `/api/v1/user/signin` | Authenticate and receive JWT | — |

### Content Management

| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:-----|
| `GET` | `/api/v1/content` | List all user content | 🔒 JWT |
| `GET` | `/api/v1/content?search=term` | Search content by title | 🔒 JWT |
| `POST` | `/api/v1/content` | Create new content | 🔒 JWT |
| `DELETE` | `/api/v1/content/:id` | Delete content by ID | 🔒 JWT |

### Brain Sharing

| Method | Endpoint | Description | Auth |
|:-------|:---------|:------------|:-----|
| `POST` | `/api/v1/brain/share` | Generate a shareable link | 🔒 JWT |
| `GET` | `/api/v1/brain/share/:shareLink` | View shared content | — (public) |

### Health Check

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `GET` | `/` | Basic health check (`"Server is working"`) |
| `GET` | `/health` | ALB health check (JSON status) |

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version | Purpose |
|:-----|:--------|:--------|
| [Node.js](https://nodejs.org/) | 22.x | Runtime |
| [Docker](https://docs.docker.com/get-docker/) | 29.x+ | Containerization |
| [Docker Compose](https://docs.docker.com/compose/) | 5.x+ | Orchestration |
| [AWS CLI](https://aws.amazon.com/cli/) | 2.x | Cloud management |
| [Terraform](https://developer.hashicorp.com/terraform/install) | 1.5+ | Infrastructure |

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/brains.git
cd brains
```

### 2. Configure Environment Variables

```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your values:
#   PORT=5000
#   MONGO_URI=your_mongodb_atlas_uri
#   JWT_SECRET=your_jwt_secret
#   API_URL=http://localhost:5000

# Root (for Docker Compose)
echo "VITE_BACKEND_URL=http://localhost:5000" > .env
```

### 3. Run Locally with Docker Compose

```bash
docker compose up --build
```

| Service | URL |
|:--------|:----|
| Frontend | http://localhost:8080 |
| Backend | http://localhost:5000 |

### 4. Run in Development Mode (without Docker)

```bash
# Terminal 1 — Backend
cd backend
npm ci
npm run dev

# Terminal 2 — Frontend
cd frontend
npm ci
npm run dev
```

| Service | URL |
|:--------|:----|
| Frontend (Vite dev) | http://localhost:5173 |
| Backend | http://localhost:5000 |

---

## ☁️ AWS Deployment

### Infrastructure Provisioning

```bash
# 1. Configure AWS CLI
aws configure
# Region: ap-south-1 (Mumbai)

# 2. Verify identity
aws sts get-caller-identity

# 3. Initialize Terraform
cd terraform
terraform init

# 4. Configure variables
cp terraform.tfvars.example terraform.tfvars
# Edit with your MongoDB URI and JWT secret

# 5. Review the plan
terraform plan

# 6. Apply infrastructure
terraform apply

# 7. Note the outputs
terraform output alb_dns_name        # → Your application URL
terraform output ecr_backend_repository   # → ECR URL for backend
terraform output ecr_frontend_repository  # → ECR URL for frontend
```

### Push Docker Images to ECR

```bash
# Login to ECR
aws ecr get-login-password --region ap-south-1 | \
  docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com

# Build and push backend
docker build -t <ECR_BACKEND_URL>:latest ./backend
docker push <ECR_BACKEND_URL>:latest

# Build and push frontend (empty BACKEND_URL for Nginx proxy mode)
docker build -t <ECR_FRONTEND_URL>:latest \
  --build-arg VITE_BACKEND_URL="" ./frontend
docker push <ECR_FRONTEND_URL>:latest
```

### Terraform Resources Created

| Resource | Count | Description |
|:---------|:-----:|:------------|
| VPC | 1 | `10.0.0.0/16` private network |
| Public Subnets | 2 | One per AZ, hosts ALB |
| Private Subnets | 2 | One per AZ, hosts EC2 instances |
| NAT Gateways | 1–2 | Internet access for private subnets |
| Internet Gateway | 1 | Public internet access |
| Security Groups | 2 | ALB (port 80) + EC2 (port 80, 5000) |
| ALB | 1 | Application Load Balancer |
| Target Groups | 2 | Frontend (:80) + Backend (:5000) |
| Launch Template | 1 | EC2 config with user data |
| Auto Scaling Group | 1 | Min: 2, Max: 4, Desired: 2 |
| ECR Repositories | 2 | Frontend + Backend images |
| IAM Role + Profile | 1 | EC2 permissions (ECR, CloudWatch, SSM) |
| CloudWatch Alarms | — | CPU, health, and error monitoring |

---

## 🔄 CI/CD Pipeline

```
                    Developer
                        │
                        │ git push (main)
                        ▼
                   ┌──────────┐
                   │  GitHub  │
                   │  Actions │
                   └────┬─────┘
                        │
              ┌─────────┴─────────┐
              ▼                   ▼
        ┌──────────┐       ┌──────────┐
        │  Backend │       │ Frontend │
        │   Build  │       │   Build  │
        │  + Test  │       │ + Lint   │
        └────┬─────┘       └────┬─────┘
             │                  │
             ▼                  ▼
        ┌───────────────────────────┐
        │    Docker Build + Push    │
        │       to AWS ECR          │
        └────────────┬──────────────┘
                     │
                     ▼
        ┌───────────────────────────┐
        │   ASG Instance Refresh    │
        │   (Rolling Deployment)    │
        └────────────┬──────────────┘
                     │
              ┌──────┴──────┐
              ▼             ▼
          ┌───────┐    ┌────────┐
          │ PASS  │    │  FAIL  │
          │ ✅    │    │  ❌   │
          └───┬───┘    └───┬────┘
              │            │
              ▼            ▼
         Keep New      Automatic
          Release      Rollback
```

---

## 🧪 Experimental Verification Plan

This project is designed to demonstrate — not just claim — high availability and resilience.

### Test 1: High Availability (Instance Failure)

```
Before:  EC2 #1 ✅  EC2 #2 ✅  →  ALB serves traffic
Action:  Terminate EC2 #1
After:   EC2 #1 ❌  EC2 #2 ✅  →  ALB continues serving (no downtime)
Result:  ASG launches EC2 #3   →  Full capacity restored automatically
```

### Test 2: Auto Scaling Under Load

```
Baseline:  2 instances (low CPU)
Load:      k6 / stress test → CPU > 70%
Scale Out: 2 → 3 → 4 instances (automatic)
Cooldown:  Load removed → CPU drops
Scale In:  4 → 3 → 2 instances (automatic)
```

### Test 3: Failed Deployment Prevention

```
Push broken code → GitHub Actions → Tests FAIL ❌ → Deployment blocked
Result: Production remains on last known good version
```

### Test 4: Bad Release Rollback

```
Deploy code that passes tests but fails health checks
→ ASG instance refresh detects unhealthy instances
→ Refresh auto-cancels
→ Old healthy instances continue serving
```

### Test 5: Load Testing Metrics

Using [k6](https://k6.io/) to measure under controlled load:

| Metric | Measured |
|:-------|:---------|
| Requests/sec | *TBD — real data* |
| Avg Latency | *TBD — real data* |
| p95 Latency | *TBD — real data* |
| Error Rate | *TBD — real data* |
| Peak CPU | *TBD — real data* |
| Scale Events | *TBD — real data* |

> **Note:** All metrics will be recorded from actual test runs. No values are fabricated.

---

## 🔒 Security

| Layer | Implementation |
|:------|:---------------|
| **Network** | VPC with public/private subnet isolation |
| **Firewall** | Security groups: ALB accepts 80/443, EC2 only from ALB |
| **Compute** | EC2 in private subnets (no direct internet access) |
| **Secrets** | SSM Parameter Store (SecureString) for MongoDB URI + JWT |
| **Auth** | JWT token-based authentication |
| **IAM** | Least-privilege EC2 role (ECR pull + CW logs + SSM read) |
| **Git** | `.gitignore` excludes `.env`, `*.tfstate`, `terraform.tfvars` |

### Files Never Committed

```
.env                    # Application secrets
terraform.tfvars        # Infrastructure secrets
*.tfstate               # Terraform state (contains resource IDs)
*.tfstate.*             # State backups
.terraform/             # Provider binaries
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```ini
PORT=5000                          # Server port
MONGO_URI=mongodb+srv://...        # MongoDB Atlas connection string
JWT_SECRET=your_secure_secret      # JWT signing key
API_URL=http://localhost:5000      # Self-referencing URL
```

### Frontend (`frontend/.env`)

```ini
VITE_BACKEND_URL=http://localhost:5000   # Local development
# VITE_BACKEND_URL=""                    # Production (Nginx proxy)
```

### Terraform (`terraform/terraform.tfvars`)

```hcl
mongo_uri  = "mongodb+srv://..."   # Passed to SSM → EC2 containers
jwt_secret = "your_secure_secret"  # Passed to SSM → EC2 containers
```

---

## 📊 AWS Cost Estimate

For `ap-south-1` (Mumbai) region:

| Resource | Monthly Estimate |
|:---------|:-----------------|
| 2× t3.micro EC2 | ~$15 |
| Application Load Balancer | ~$16 |
| NAT Gateway | ~$32 |
| ECR Storage | Free (< 500MB) |
| CloudWatch | Free tier |
| SSM Parameters | Free |
| **Total** | **~$63/month** |

> 💡 **Cost optimization:** For testing only, reduce to 1 NAT Gateway and `t2.micro` instances (free tier eligible) to bring costs to ~$16–20/month.

---

## 🗺️ Roadmap

- [x] Full-stack application (React + Express + MongoDB)
- [x] JWT authentication
- [x] Docker containerization (multi-stage builds)
- [x] Docker Compose orchestration
- [x] Terraform infrastructure (VPC, ALB, ASG, ECR)
- [x] Multi-AZ high availability
- [x] Auto-scaling (CPU-based)
- [x] IAM roles and security groups
- [x] CloudWatch monitoring
- [ ] GitHub Actions CI/CD deployment pipeline
- [ ] Rolling deployment with automated rollback
- [ ] HTTPS via ACM certificate
- [ ] Load testing with k6 (record real metrics)
- [ ] Chaos testing (instance termination demo)
- [ ] CloudFront CDN for frontend
- [ ] WAF integration
- [ ] Staging environment

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/your-feature
   ```
3. **Commit** your changes
   ```bash
   git commit -m "feat: add your feature"
   ```
4. **Push** to your branch
   ```bash
   git push origin feature/your-feature
   ```
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

