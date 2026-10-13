# Certificate & Achievement Management Guide (GitHub + JSON)

This guide documents how to add, edit, or hide certificates, courses, workshops, hackathons, and achievements in Kathiravan V's portfolio **without modifying any React or UI code**.

---

## 📁 1. Directory Structure

```text
public/
  certificates/
    ├── [certificate-image.jpg / .png / .pdf]  <-- Put your certificate files here
    ├── previews/                               <-- Optional PNG previews of PDF certificates
    └── compatitions/                           <-- Competition & award photos/posters

src/
  data/
    ├── certificates.json                      <-- SOURCE OF TRUTH (add/edit records here)
    └── certificatesData.ts                    <-- Typed parser & query helper
```

---

## ⚡ 2. Quick 4-Step Workflow for New Certificates

Whenever you finish a new course, internship, or hackathon:

### Step 1: Save the Certificate Asset
Place the image (`.png`, `.jpg`, `.webp`) or PDF in:
- `public/certificates/your-certificate-name.pdf` (or `.png` / `.jpg`)

*(Note: Files in `public/` are served from the root URL. If placed in `public/certificates/my-cert.png`, the path in JSON is `"/certificates/my-cert.png"`).*

### Step 2: Add a Record in `src/data/certificates.json`
Open `src/data/certificates.json` and paste a new JSON object at the top or bottom of the array.

### Step 3: Validate the Data
Run the built-in validation script:
```bash
npm run validate:certificates
```

### Step 4: Commit and Push to GitHub
```bash
git add public/certificates/ src/data/certificates.json
git commit -m "feat(credentials): add [Certificate Title]"
git push origin main
```
Your hosting pipeline (e.g., Vercel, GitHub Pages, or Cloud Run) will automatically rebuild and deploy your portfolio with the new credential!

---

## 📋 3. JSON Schema & Template

Copy and paste this template into `src/data/certificates.json`:

```json
{
  "id": "unique-kebab-case-id",
  "title": "Exact Title on Certificate",
  "organization": "Issuing Organization or University",
  "category": "COURSES",
  "completionDate": "2026-10-15",
  "year": 2026,
  "date": "October 2026",
  "description": "Factual description of what was learned, built, or accomplished.",
  "skills": ["Skill 1", "Skill 2", "Skill 3"],
  "credentialId": "OPTIONAL_CREDENTIAL_ID_OR_NULL",
  "verificationUrl": "https://verification-portal-link.com/id",
  "image": "/certificates/your-certificate.png",
  "file": "/certificates/your-certificate.pdf",
  "featured": false,
  "visible": true,
  "credentialStatus": "Verified Credential"
}
```

---

## 🏷️ 4. Field Reference & Rules

| Field | Type | Required? | Description & Instructions |
| :--- | :--- | :--- | :--- |
| `id` | `string` | **Yes** | Unique identifier in kebab-case. Example: `"aws-cloud-practitioner"`. Must not duplicate any existing ID. |
| `title` | `string` | **Yes** | Exact certificate or achievement title as printed on the document. |
| `organization` | `string` | **Yes** | Issuing institution, university, or platform (e.g., `"Microsoft"`, `"Simplilearn SkillUP"`). |
| `category` | `string` | **Yes** | One of: `COURSES`, `TECHNICAL`, `INTERNSHIPS`, `HACKATHONS`, `WORKSHOPS`, `ACHIEVEMENTS`, `AWARDS`, `LEADERSHIP`. |
| `completionDate` | `string` | Optional | ISO format date (`YYYY-MM-DD`). |
| `year` | `number` | Optional | 4-digit completion year (e.g., `2026`). |
| `date` | `string` | Optional | Friendly display date (e.g., `"October 2026"` or `"April 10 – 24, 2026"`). |
| `description` | `string` | **Yes** | 1–2 factual sentences describing what you mastered or engineered. |
| `skills` | `string[]` | **Yes** | Array of 2–5 relevant tags (e.g., `["Python", "ESP32", "Deep Learning"]`). |
| `credentialId` | `string \| null` | Optional | Certificate identification code or serial number. Set to `null` if none exists. |
| `verificationUrl` | `string \| null` | Optional | Genuine online verification link. Must start with `https://` or `http://`. Set to `null` if none. |
| `image` | `string \| null` | Optional | Path to image or preview thumbnail (e.g., `"/certificates/my-cert.png"`). |
| `file` | `string \| null` | Optional | Path to downloadable PDF or high-res document. Set to `null` if none. |
| `featured` | `boolean` | Optional | `true` if you want this credential highlighted; `false` otherwise. |
| `visible` | `boolean` | **Yes** | Set to `true` to display publicly; set to `false` to hide without deleting the record. |
| `credentialStatus` | `string` | Optional | Short label shown on badge (e.g., `"Verified Credential"`, `"1st Place Award"`, `"Industrial Internship"`). |

---

## 🎯 5. How-To Scenarios

### How to hide a certificate without deleting it
Change `"visible": true` to `"visible": false`:
```json
{
  "id": "old-certificate",
  "visible": false
}
```
The portfolio will immediately exclude it from the public view.

### How to add a certificate that only has a PDF (no image yet)
```json
{
  "id": "deep-learning-specialization",
  "title": "Deep Learning Specialization",
  "organization": "Coursera & DeepLearning.AI",
  "category": "COURSES",
  "completionDate": "2026-10-15",
  "year": 2026,
  "description": "Completed neural network architectures, backpropagation, and CNN implementations.",
  "skills": ["PyTorch", "CNNs", "Optimization"],
  "credentialId": "XYZ12345",
  "verificationUrl": "https://coursera.org/verify/XYZ12345",
  "image": null,
  "file": "/certificates/deep-learning.pdf",
  "visible": true
}
```
The portfolio will automatically render a clean award fallback card with a direct **"Open Attached Document / PDF"** button.

---

## 🧪 6. Testing & Validation Commands

To validate your `certificates.json` file for syntax errors, missing fields, or invalid asset paths:

```bash
# Validate JSON records & local file paths
npm run validate:certificates

# Test production build locally
npm run build
```

---

## 🚀 7. Deployment Notes

- Because all certificates are loaded statically through Vite, there are **no backend servers or databases** to maintain.
- Changes pushed to the `main` branch trigger your hosting pipeline to rebuild and deploy the static assets.
- All genuine assets remain safely tracked in version control under `/public/certificates/`.
