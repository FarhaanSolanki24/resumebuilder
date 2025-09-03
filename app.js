const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const { Resume, JobAlert } = require('./models');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

const MONGO_URI =
  'mongodb+srv://Farhaan24:Farhaan24@cluster24.zjugazh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster24';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

app.get('/', (req, res) => {
  res.render('index', { title: 'Welcome' });
});

app.get('/resume-builder', (req, res) => {
  res.render('resume-builder', { title: 'Resume Builder' });
});

app.get('/skills-demo', (req, res) => {
  res.render('skills-demo', { title: 'Skills & Demo Questions' });
});

app.get('/interview-tips', (req, res) => {
  res.render('interview-tips', { title: 'Interview Tips' });
});

app.get('/cover-letter', (req, res) => {
  res.render('cover-letter', { title: 'Cover Letter Builder' });
});

app.get('/application-tracking', (req, res) => {
  res.render('application-tracking', { title: 'Application Tracking' });
});

app.get('/job-alerts', (req, res) => {
  res.render('job-alerts', { title: 'Job Alerts' });
});

app.get('/job-matching', (req, res) => {
  res.render('job-matching', { title: 'Job Matching' });
});

app.get('/about', (req, res) => {
  res.send('This is an about page.');
});

app.post('/api/setJobAlert', async (req, res) => {
  const { keyword, location, email } = req.body;

  // Validate inputs (server-side validation)
  if (!keyword || !location || !email) {
    return res.status(400).json({ error: 'Please fill in all fields.' });
  }

  try {

    const newAlert = new JobAlert({ keyword, location, email });
    await newAlert.save();

    await sendJobAlertEmail(email, keyword, location);

    res.json({ message: 'Job alert successfully set!' });
  } catch (error) {
    console.error('Error setting job alert:', error);
    res.status(500).json({ error: 'Failed to set job alert.' });
  }
});

async function sendJobAlertEmail(toEmail, keyword, location) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'farhaansolanki24@gmail.com',
      pass: 'qkto qdcg ycas iacz',
    },
  });

  const mailOptions = {
    from: 'farhaansolanki24@gmail.com',
    to: toEmail,
    subject: 'New Job Alert Set',
    text: `You have set a job alert for "${keyword}". We'll let you know when the job is available in "${location}".`,
    html: `<p>You have set a job alert for keyword <b>"${keyword}"</b>. We'll let you know when the job is available in <b>"${location}"</b>.</p>`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}


app.post('/api/saveResume', async (req, res) => {
  try {
    const resumeData = req.body;

    if (!resumeData.name || !resumeData.email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    const newResume = new Resume({
      name: resumeData.name,
      email: resumeData.email,
      phone: resumeData.phone,
      summary: resumeData.summary,
      experience: resumeData.experience,
      education: resumeData.education,
      skills: resumeData.skills,
      projects: resumeData.projects,
      colorScheme: resumeData.colorScheme,
      font: resumeData.font,
      fontStyle: resumeData.fontStyle,
      templateStyles: resumeData.templateStyles,
    });

    await newResume.save();

    res.json({ message: 'Resume saved successfully!' });
  } catch (error) {
    console.error('Error saving resume:', error);
    res.status(500).json({ error: 'Failed to save resume.', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Resume Builder App listening at http://localhost:${port}`);
});