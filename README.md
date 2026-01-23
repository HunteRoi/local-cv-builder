# CV Builder

A TypeScript-based CV/Resume generator that creates professional PDF documents from JSON data files. Supports multiple languages and customizable templates.

## 🚀 Features

- ✅ Multi-language support (English, French, or add your own)
- ✅ Generate professional PDF resumes
- ✅ JSON-based content management
- ✅ Customizable HTML template
- ✅ Environment-based configuration
- ✅ Automatic results folder creation

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd builder
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables (see [Environment Configuration](#environment-configuration))

4. Set up your content files (see [Content Structure](#content-structure))

## ⚙️ Environment Configuration

Create a `.env` file in the root directory:

```env
fileName=cv_yourname
```

### Environment Variables

| Variable   | Description                                                 | Example                |
| ---------- | ----------------------------------------------------------- | ---------------------- |
| `fileName` | Base name for generated PDF files (without language suffix) | `cv_servais_guillaume` |

The final PDF will be named: `{fileName}_{language}.pdf`  
Example: `cv_servais_guillaume_en.pdf`, `cv_servais_guillaume_fr.pdf`

## 📁 Content Structure

All content files are located in the `content/` directory. You need to create/customize the following files:

### 1. Experiences (`content/experiences/`)

Create language-specific files: `en.json`, `fr.json`

```json
[
	{
		"title": "Software Developer",
		"place": "Company Name",
		"startDate": "2024-01-01",
		"endDate": null,
		"description": "Brief description of the role",
		"tasks": ["Task or achievement 1", "Task or achievement 2"],
		"technologies": [".NET", "React", "SQL"]
	}
]
```

**Fields:**

- `title` (string): Job title
- `place` (string): Company name
- `startDate` (string): ISO date format (YYYY-MM-DD)
- `endDate` (string|null): ISO date format or `null` for current position
- `description` (string): Role description
- `tasks` (array|null): List of responsibilities or achievements
- `technologies` (array): Technologies used (optional, for reference)

### 2. Skills (`content/skills/content.json`)

Not language-specific (same for all languages):

```json
["JavaScript", "TypeScript", "React", "Node.js", "SQL"]
```

### 3. Languages (`content/languages/`)

Create language-specific files: `en.json`, `fr.json`

```json
[
	{
		"name": "English",
		"level": "C1"
	},
	{
		"name": "French",
		"level": "Native"
	}
]
```

**Fields:**

- `name` (string): Language name
- `level` (string): Proficiency level (A1-C2, Native, etc.)

### 4. Education (`content/educations/`)

Create language-specific files: `en.json`, `fr.json`

```json
[
	{
		"school": "University Name",
		"place": "City",
		"degree": "Bachelor's in Computer Science",
		"year": "2019 - 2022"
	}
]
```

**Fields:**

- `school` (string): Institution name
- `place` (string): Location
- `degree` (string): Degree/qualification
- `year` (string): Period or graduation year

### 5. Certifications (`content/certifications/content.json`)

Not language-specific:

```json
[
	{
		"title": "AWS Certified Developer",
		"date": "2024-03-15"
	}
]
```

**Fields:**

- `title` (string): Certification name
- `date` (string): ISO date format (YYYY-MM-DD)

### 6. Hackathons (`content/hackathons/`)

Create language-specific files: `en.json`, `fr.json`

```json
[
	{
		"place": "Hackathon Name 2024",
		"project": "Project Title",
		"description": "Brief project description",
		"date": "2024-06-01",
		"price": "First Place Prize"
	}
]
```

**Fields:**

- `place` (string): Hackathon name/event
- `project` (string): Project name
- `description` (string): Project description
- `date` (string): ISO date format (YYYY-MM-DD)
- `price` (string|null): Award/prize or `null`

### 7. Translations (`content/translations/`)

Create language-specific files: `en.json`, `fr.json`

```json
{
	"now": "Present",
	"drivingLicense": "Driver's License",
	"age": "years old",
	"title": "Software Developer",
	"won": "Won"
}
```

**Required Keys:**

- `now`: Text for current/ongoing positions
- `drivingLicense`: Driving license text
- `age`: Age suffix text
- `title`: Your professional title
- `won`: Text for prizes/awards

### 8. Profile Picture

Place your profile picture at: `content/profile_picture.jpg`

Recommended: Square image, 500x500px or larger

### 9. HTML Template

Edit `content/base.html` to customize the CV layout and styling.

**Available placeholders:**

- `{{ProfilePicture}}` - Base64 encoded profile image
- `{{Title}}` - Professional title
- `{{DrivingLicense}}` - Driving license text
- `{{Experiences}}` - Work experience section
- `{{Languages}}` - Languages section
- `{{Skills}}` - Skills section
- `{{Educations}}` - Education section
- `{{Certifications}}` - Certifications section
- `{{Hackathons}}` - Hackathons/Projects section

## 🏃 Running the CV Builder

Generate your CV PDFs:

```bash
npm run build-cv
```

This will:

1. Read all content files
2. Generate HTML for each language (en, fr)
3. Convert HTML to PDF using Puppeteer
4. Save PDFs in the `results/` folder

### Output

Generated PDFs will be saved as:

- `results/cv_yourname_en.pdf`
- `results/cv_yourname_fr.pdf`

## 🌍 Adding More Languages

To add a new language (e.g., Spanish):

1. Add language files in these directories:
    - `content/experiences/es.json`
    - `content/educations/es.json`
    - `content/languages/es.json`
    - `content/hackathons/es.json`
    - `content/translations/es.json`

2. Update `model/LanguageOptions.ts`:

```typescript
export type LanguageOptions = 'fr' | 'en' | 'es';
```

3. Update `builder.ts`:

```typescript
const languages = ['fr' as LanguageOptions, 'en' as LanguageOptions, 'es' as LanguageOptions];
```

## 📂 Project Structure

```
builder/
├── content/              # All CV content
│   ├── certifications/
│   ├── educations/
│   ├── experiences/
│   ├── hackathons/
│   ├── languages/
│   ├── skills/
│   ├── translations/
│   ├── base.html        # HTML template
│   └── profile_picture.jpg
├── model/               # TypeScript interfaces
├── utils/               # Helper functions
├── results/             # Generated PDFs (auto-created)
├── .env                 # Environment configuration
├── builder.ts           # Main entry point
└── package.json
```

## 🔧 Development

### Build Script

```bash
npm run build-cv
```

### TypeScript Compilation

The project uses `tsx` for TypeScript execution without pre-compilation.

## 📝 Tips

- **Date Formats**: Always use ISO format (YYYY-MM-DD) for dates
- **Current Position**: Set `endDate` to `null` for ongoing roles
- **Optional Fields**: Set `tasks`, `price`, or `description` to `null` if not needed
- **Sorting**: Experiences are automatically sorted by most recent first
- **Profile Picture**: Use JPG format for best compatibility

## 🐛 Troubleshooting

### "ENOENT: no such file or directory"

- Make sure all required JSON files exist for your languages
- Check that file names match exactly (case-sensitive)

### PDF not generating

- Verify all JSON files have valid syntax
- Check that dates are in correct ISO format (YYYY-MM-DD)
- Ensure profile picture exists at `content/profile_picture.jpg`

### Missing environment variable

- Create `.env` file with `fileName` variable
- Restart the build process after creating `.env`
