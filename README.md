# CV Builder

A TypeScript-based CV/Resume generator that creates professional PDF documents from JSON data files. Supports multiple languages, customizable templates, and flexible section inclusion.

## 🚀 Features

- ✅ Multi-language support (English, French, or add your own)
- ✅ Generate professional PDF resumes
- ✅ JSON-based content management
- ✅ Customizable HTML template
- ✅ CLI arguments to include/exclude sections
- ✅ Automatic hiding of empty sections
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
Example: `cv_servais_guillaume_en-US.pdf`, `cv_servais_guillaume_fr-BE.pdf`

## 📁 Content Structure

All content files are located in the `content/` directory. You need to create/customize the following files:

### 1. Experiences (`content/experiences/`)

Create language-specific files: `en-US.json`, `fr-BE.json`

```json
[
	{
		"title": "Software Developer",
		"company": {
			"name": "Company Name",
			"place": "City (Country)"
		},
		"startDate": "2024-01-01",
		"endDate": null,
		"description": "Brief description of the role",
		"tasks": ["Task or achievement 1", "Task or achievement 2"],
		"technologies": [".NET", "React", "SQL"],
		"tools": ["VSCode", "Rider", "CodeScene"],
		"metholodogies": ["Scrum"],
		"links": []
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
- `tools` (array): Tools used (optional, for reference)
- `methodologies` (array): Metholodogies used (optional, for reference)
- `links` (array): Links to external resources (optional, for reference)

### 2. Skills (`content/skills/content.json`)

Not language-specific (same for all languages):

```json
["JavaScript", "TypeScript", "React", "Node.js", "SQL"]
```

### 3. Languages (`content/languages/`)

Create language-specific files: `en-US.json`, `fr-BE.json`

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

Create language-specific files: `en-US.json`, `fr-BE.json`

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


### 6. Projects (`content/open-source/`)

Create language-specific files: `en-US.json`, `fr-BE.json`

```json
[
	{
		"project": "Open Source Project Title",
		"description": "Brief project description",
		"date": "2024-06-01",
		"links": ["https://github.com/example"]
	}
]
```

**Fields:**

- `project` (string): Project name
- `description` (string): Project description
- `date` (string): ISO date format (YYYY-MM-DD)
- `links` (array): Links to external resources (optional)

### 7. Hackathons (`content/hackathons/`)

Create language-specific files: `en-US.json`, `fr-BE.json`

```json
[
	{
		"place": "Hackathon Name 2024",
		"project": "Project Title",
		"description": "Brief project description",
		"date": "2024-06-01",
		"price": "First Place Prize",
		"links": ["https://google.com"]
	}
]
```

**Fields:**

- `place` (string): Hackathon name/event
- `project` (string): Project name
- `description` (string): Project description
- `date` (string): ISO date format (YYYY-MM-DD)
- `price` (string|null): Award/prize or `null`
- `links` (array): Links to external resources (optional)

### 8. Translations (`content/translations/`)

Create language-specific files: `en-US.json`, `fr-BE.json`

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

### 9. Profile (`content/profile/content.json`)

Not language-specific. Contains your personal information:

```json
{
    "firstName": "John",
    "lastName": "DOE",
    "email": "john.doe@email.com",
    "phone": "+1 (555) 123-4567",
    "city": "New York",
    "hasDriverLicense": true,
    "picture": "profile_picture.jpg"
}
```

**Fields:**

- `firstName` (string): Your first name
- `lastName` (string): Your last name
- `email` (string): Your email address
- `phone` (string): Your phone number
- `city` (string): Your city/location
- `hasDriverLicense` (boolean): Whether to display driving license
- `picture` (string): Filename of your profile picture (in `content/` folder)

### 10. Summary (`content/profile/`)

Create language-specific files: `en-US.json`, `fr-BE.json` for the professional summary.

```json
{
    "summary": [
        "First paragraph of your professional summary.",
        "Second paragraph with more details about your experience.",
        "Third paragraph about your skills and interests."
    ]
}
```

**Fields:**
- `summary` (array): Array of paragraphs for your professional summary

### 11. Profile Picture

Place your profile picture at: `content/profile_picture.jpg`

Recommended: Square image, 500x500px or larger

### 12. HTML Template

Edit `content/base.html` to customize the CV layout and styling.

**Available placeholders:**

- `{{FullName}}` - Your full name (firstName + lastName)
- `{{Email}}` - Your email address
- `{{Phone}}` - Your phone number
- `{{City}}` - Your city/location
- `{{DriverLicenseSection}}` - Driving license section (shown if `hasDriverLicense` is true)
- `{{Summary}}` - Your professional summary paragraphs
- `{{ProfilePicture}}` - Base64 encoded profile image
- `{{Title}}` - Professional title (from translations)
- `{{Experiences}}` - Work experience section
- `{{HackathonsSection}}` - Hackathons section (hidden if empty or excluded)
- `{{OpenSourceSection}}` - Open source projects section (hidden if empty or excluded)
- `{{CertificationsSection}}` - Certifications section (hidden if empty or excluded)
- `{{SkillsSection}}` - Skills section (hidden if empty or excluded)
- `{{EducationsSection}}` - Education section (hidden if empty or excluded)
- `{{LanguagesSection}}` - Languages section (hidden if empty or excluded)

## 🏃 Running the CV Builder

Generate your CV PDFs:

```bash
npm run build-cv -- en-US
```

### Command Line Options

```bash
npx tsx ./builder.ts [languages...] [options...]
```

**Languages:**
- `en-US`, `fr-FR`, etc. - Specify which language(s) to generate CVs for

**Section Options:**

| Option | Description |
|--------|-------------|
| `--no-hackathons` | Exclude hackathons section |
| `--no-open-source` | Exclude open-source projects section |
| `--no-certifications` | Exclude certifications section |
| `--no-education` | Exclude education section |
| `--no-skills` | Exclude skills section |
| `--no-languages` | Exclude languages section |
| `--help` | Show help message |

**Examples:**

```bash
# Generate English CV with all sections
npx tsx ./builder.ts en-US

# Generate multiple languages
npx tsx ./builder.ts en-US fr-FR

# Exclude hackathons and open-source sections
npx tsx ./builder.ts en-US --no-hackathons --no-open-source

# Generate minimal CV (experiences only)
npx tsx ./builder.ts en-US --no-hackathons --no-open-source --no-certifications --no-education --no-skills --no-languages
```

### Empty Section Handling

Sections with no content are automatically hidden. For example, if your `certifications/content.json` is an empty array `[]`, the Certifications section won't appear in the output.

This will:

1. Read all content files
2. Apply section inclusion/exclusion options
3. Generate HTML for each specified language
4. Convert HTML to PDF using Puppeteer
5. Save HTML and PDFs in the `results/` folder

### Output

Generated PDFs will be saved as:

- `results/cv_yourname_en-US.pdf`
- `results/cv_yourname_fr-BE.pdf`

## 🌍 Adding More Languages

To add a new language (e.g., Spanish):

1. Add language files in these directories:
    - `content/experiences/es-ES.json`
    - `content/educations/es-ES.json`
    - `content/languages/es-ES.json`
    - `content/hackathons/es-ES.json`
    - `content/translations/es-ES.json`

2. Update `model/LanguageOptions.ts`:

```typescript
export const languageOptions = ['fr-BE', 'en-US', 'es-ES'] as const;
export type LanguageOptions = typeof languageOptions[number];
```

3. Update `builder.ts` if needed to include the new language in the `languages` array.

## 📂 Project Structure

```
builder/
├── content/              # All CV content
│   ├── certifications/
│   ├── educations/
│   ├── experiences/
│   ├── hackathons/
│   ├── open-source/
│   ├── languages/
│   ├── profile/         # Personal information (content.json)
│   ├── skills/
│   ├── translations/
│   ├── base.html        # HTML template
│   └── profile_picture.jpg
├── model/               # TypeScript interfaces
│   ├── BuildOptions.ts  # Section inclusion options
│   ├── Profile.ts       # Profile data interface
│   └── ...
├── utils/               # Helper functions
├── results/             # Generated PDFs (auto-created)
├── .env                 # Environment configuration
├── builder.ts           # Main entry point (CLI)
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
- **Optional Fields**: Set `tasks`, `price`, `description`, or `links` to `null` if not needed
- **Sorting**: Experiences are automatically sorted by most recent first
- **Profile Picture**: Use JPG format for best compatibility
- **Empty Sections**: Sections with no data are automatically hidden
- **CLI Flexibility**: Use `--no-*` flags to exclude specific sections from output

## 🐛 Troubleshooting

### "ENOENT: no such file or directory"

- Make sure all required JSON files exist for your languages
- Check that file names match exactly (case-sensitive)
- Ensure `content/profile/content.json` exists with your profile data

### PDF or HTML not generating

- Verify all JSON files have valid syntax
- Check that dates are in correct ISO format (YYYY-MM-DD)
- Ensure profile picture exists at `content/profile_picture.jpg`

### Missing environment variable

- Create `.env` file with `fileName` variable
- Restart the build process after creating `.env`
