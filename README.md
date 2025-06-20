# Harris Song - Personal Academic Website

This is the source code for my personal academic website, hosted at [harris-song.github.io](https://harris-song.github.io).

## About

I am an undergraduate Computer Science student at UCLA with research interests in computer vision, machine learning, and robotics. This website showcases my research projects, publications, and professional experience.

## Website Features

- **About**: Personal background and research interests
- **Projects**: Selected research and development projects
- **Publications**: Academic papers and conference proceedings
- **CV**: Professional experience and education

## Local Development

To run the website locally for development:

### Prerequisites
- Ruby and Jekyll
- Node.js
- Git

### Setup
1. Clone this repository
2. Install dependencies:
   ```bash
   bundle install
   ```
3. Run the local server:
   ```bash
   bundle exec jekyll serve -l -H localhost
   ```
4. Open `http://localhost:4000` in your browser

### Using Docker (Alternative)
If you prefer to use Docker:
```bash
chmod -R 777 .
docker compose up
```

## Technology Stack

This website is built using:
- **Jekyll** - Static site generator
- **GitHub Pages** - Hosting platform
- **Academic Pages Template** - Base template (customized)
- **Liquid** - Templating language
- **Sass** - CSS preprocessing

## License

This website is based on the Academic Pages template, which is released under the MIT License.
