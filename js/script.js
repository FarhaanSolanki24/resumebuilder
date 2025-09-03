async function generateResume() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const age = document.getElementById("age").value;
  const experience = document.getElementById("experience").value;
  const qualifications = document.getElementById("qualifications").value;
  const skillsInput = document.getElementById("skills").value;
  const certificationsInput = document.getElementById("certifications").value;
  const achievementsInput = document.getElementById("achievements").value;
  const hobbiesInput = document.getElementById("hobbies").value;
  const languagesInput = document.getElementById("languages").value;
  const template = document.getElementById("template").value;
  const colorScheme = document.getElementById("colorScheme").value;
  const font = document.getElementById("font").value;

  const skills = skillsInput.split(",").map(skill => skill.trim()).filter(skill => skill !== "");
  const certifications = certificationsInput.split(",").map(cert => cert.trim()).filter(cert => cert !== "");
  const achievements = achievementsInput.split(",").map(achievement => achievement.trim()).filter(achievement => achievement !== "");
  const hobbies = hobbiesInput.split(",").map(hobby => hobby.trim()).filter(hobby => hobby !== "");
  const languages = languagesInput.split(",").map(lang => lang.trim()).filter(lang => lang !== "");

  let templateStyles = "";
  let contentBgColor = "#ffffff";
  let borderStyle = `2px solid ${colorScheme}`;
  let fontStyle = "normal";

  if (template === "modern") {
    templateStyles = `
          background-color: #f9f9f9;
          border-left: 6px solid ${colorScheme};
          padding: 20px;
          border-radius: 8px;
      `;
  } else if (template === "classic") {
    templateStyles = `
          background-color: ${contentBgColor};
          border: 2px double ${colorScheme};
          padding: 15px;
          font-style: italic;
      `;
    fontStyle = "italic";
  } else {
    templateStyles = `
          background-color: ${contentBgColor};
          border: ${borderStyle};
          padding: 20px;
          border-radius: 10px;
      `;
  }

  const sectionTitleStyle = `
      font-weight: bold;
      color: #000;
      margin-top: 15px;
      font-size: 14px;
  `;

  const contentStyle = `
      color: ${colorScheme};
      font-size: 13px;
      margin: 5px 0 10px 0;
      font-style: ${fontStyle};
  `;

  const hrStyle = `
      border: none;
      border-top: 1px solid ${colorScheme};
      margin: 10px 0;
  `;

  const output = `
      <div style="font-family: ${font}, sans-serif; max-width: 700px; margin: 20px auto; ${templateStyles}">
          <h2 style="text-align: center; font-size: 20px; font-weight: bold; color: ${colorScheme}; margin-bottom: 20px;">Resume</h2>

          <p style="${sectionTitleStyle}">Name:</p>
          <p style="${contentStyle}">${name}</p>
          <hr style="${hrStyle}">

          <p style="${sectionTitleStyle}">Email:</p>
          <p style="${contentStyle}">${email}</p>
          <hr style="${hrStyle}">

          <p style="${sectionTitleStyle}">Phone:</p>
          <p style="${contentStyle}">${phone}</p>
          <hr style="${hrStyle}">

          <p style="${sectionTitleStyle}">Age:</p>
          <p style="${contentStyle}">${age}</p>
          <hr style="${hrStyle}">

          <p style="${sectionTitleStyle}">Work Experience:</p>
          <p style="${contentStyle}">${experience}</p>
          <hr style="${hrStyle}">

          <p style="${sectionTitleStyle}">Qualifications:</p>
          <p style="${contentStyle}">${qualifications}</p>
          <hr style="${hrStyle}">

          <p style="${sectionTitleStyle}">Skills:</p>
          <div style="border: 1px dashed ${colorScheme}; padding: 10px; border-radius: 5px;">
              <p style="${contentStyle}">${skills.join(", ")}</p>
          </div>
          <hr style="${hrStyle}">

          <p style="${sectionTitleStyle}">Certifications:</p>
          <p style="${contentStyle}">${certifications.join(", ")}</p>
          <hr style="${hrStyle}">

          <p style="${sectionTitleStyle}">Achievements:</p>
          <p style="${contentStyle}">${achievements.join(", ")}</p>
          <hr style="${hrStyle}">

          <p style="${sectionTitleStyle}">Hobbies:</p>
          <p style="${contentStyle}">${hobbies.join(", ")}</p>
          <hr style="${hrStyle}">

          <p style="${sectionTitleStyle}">Languages:</p>
          <p style="${contentStyle}">${languages.join(", ")}</p>
      </div>
  `;

  document.getElementById("resumeOutput").innerHTML = output;
  generateSkillQuestions(skills.join(", ")); 
  const resumeData = {
    name: name,
    email: email,
    phone: phone,
    age: age,
    experience: experience,
    qualifications: qualifications,
    skills: skills, 
    certifications: certifications, 
    achievements: achievements, 
    hobbies: hobbies, 
    languages: languages, 
    template: template,
    colorScheme: colorScheme,
    font: font,
    templateStyles: templateStyles,
    fontStyle: fontStyle,
  };

  try {
    const response = await fetch('/api/saveResume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resumeData),
    });
    console.log("resumeData before stringify:", resumeData);
    const data = await response.json();

    if (response.ok) {
      console.log(data.message); 
      alert('Resume generated and saved successfully!'); 
    } else {
      console.error(data.error); 
      alert('Resume generated, but failed to save: ' + data.error);
    }
  } catch (error) {
    console.error('Error saving resume:', error);
    alert('Resume generated, but an error occurred while saving.');
  }
}

function generateSkillQuestions(skillsInput) {
  if (!skillsInput.trim()) {
    const demoQuestionsElement = document.getElementById("demoQuestions");
    demoQuestionsElement.innerHTML = "<p>No skills available to generate questions.</p>";
    return;
  }

  const skills = skillsInput.split(",").map(skill => skill.trim().toLowerCase());
  const skillQuestions = {
    javascript: [
      "Explain the concept of closures in JavaScript.",
      "What is the difference between `var`, `let`, and `const`?",
      "How does event delegation work in JavaScript?",
      "What are promises, and how are they used in JavaScript?",
      "Explain the concept of async/await with an example.",
      "What is the difference between null and undefined in JavaScript?",
      "Explain the concept of event bubbling and event capturing in JavaScript."
    ],
    python: [
      "What are Python's key data structures?",
      "Explain Python's Global Interpreter Lock (GIL).",
      "What is the difference between a list and a tuple?",
      "How do you handle exceptions in Python?",
      "What are Python decorators, and how are they used?",
      "What is a lambda function in Python, and when would you use one?",
      "How does Python handle memory management?"
    ],
    sql: [
      "What are the different types of SQL joins?",
      "Explain the difference between `WHERE` and `HAVING` clauses.",
      "How do you optimize a query for better performance?",
      "What is the purpose of indexing in SQL?",
      "How do you handle duplicate records in SQL?",
      "What is a subquery in SQL, and how is it used?",
      "How do you perform a full-text search in SQL?"
    ],
    html: [
      "What are semantic tags in HTML?",
      "Explain the difference between `id` and `class` attributes.",
      "How do you embed multimedia content in HTML?",
      "What is the purpose of the `meta` tag in HTML?",
      "Explain the use of the `canvas` element in HTML."
    ],
    css: [
      "What is the difference between relative, absolute, and fixed positioning?",
      "Explain the concept of the CSS box model.",
      "How do you implement responsive design using CSS?",
      "What are CSS variables, and how are they used?",
      "Explain the concept of flexbox and its properties.",
      "What is the difference between inline, block, and inline-block elements in CSS?",
      "What are media queries, and how do you use them?"
    ],
    java: [
      "What is the difference between JDK, JRE, and JVM?",
      "Explain the concept of inheritance in Java.",
      "What are the different types of memory in Java?",
      "What is the purpose of garbage collection in Java?",
      "Explain the difference between `ArrayList` and `LinkedList`.",
      "What is the difference between == and === in Java?",
      "Explain the concept of exception handling in Java."
    ],
    csharp: [
      "What is the difference between a struct and a class in C#?",
      "Explain the concept of LINQ in C#.",
      "How do you implement exception handling in C#?",
      "What are delegates in C#?",
      "What is the purpose of async and await in C#?",
      "What is the difference between ref and out parameters in C#?",
      "What is the purpose of the using statement in C#?"
    ],
    cpp: [
      "What is the difference between a pointer and a reference in C++?",
      "Explain the concept of polymorphism in C++.",
      "What are templates in C++ and how are they used?",
      "How does the Standard Template Library (STL) work in C++?",
      "What is RAII (Resource Acquisition Is Initialization) in C++?",
      "What is the purpose of the new and delete operators in C++?",
      "Explain the difference between deep copy and shallow copy in C++."
    ],
    react: [
      "What are React hooks and why are they used?",
      "Explain the concept of state and props in React.",
      "What is the virtual DOM and how does it work in React?",
      "How do you handle side effects in React?",
      "What is the purpose of React context?"
    ],
    angular: [
      "What are Angular components and how are they structured?",
      "Explain Angular's dependency injection system.",
      "What are Angular directives and how do they work?",
      "What is the purpose of Angular services?",
      "How do you optimize performance in Angular applications?"
    ],
    cybersecurity: [
      "What is the difference between symmetric and asymmetric encryption?",
      "Explain what a firewall does and how it works.",
      "What is a man-in-the-middle attack, and how can you prevent it?",
      "How do you ensure the security of a password?"
    ],
    ruby: [
      "What are blocks and how are they used in Ruby?",
      "What is the difference between a symbol and a string in Ruby?",
      "How does Ruby's garbage collection work?",
      "What is a mixin in Ruby?",
      "Explain the concept of metaprogramming in Ruby."
    ],
    node: [
      "What is the event loop in Node.js?",
      "How do you handle asynchronous operations in Node.js?",
      "Explain the concept of callback hell and how to avoid it.",
      "What is the purpose of the require() function in Node.js?",
      "How does Node.js handle I/O operations?"
    ],
    excel: [
      "What are pivot tables, and how do you use them?",
      "Explain the use of VLOOKUP and HLOOKUP functions.",
      "How can you create a chart in Excel?",
      "What are conditional formatting rules in Excel?",
      "How do you use macros in Excel?"
    ],
    word: [
      "How do you create and format a table in Word?",
      "What are styles, and how are they applied in Word?",
      "How do you use mail merge in Word?",
      "What is the purpose of headers and footers in a document?",
      "Explain the process of tracking changes in Word."
    ],
    powerpoint: [
      "How do you create a custom slide layout in PowerPoint?",
      "What are transitions and animations in PowerPoint?",
      "How do you insert and format a video in a presentation?",
      "What is the purpose of slide master in PowerPoint?",
      "How do you use SmartArt in PowerPoint?"
    ]
  };

  const demoQuestionsElement = document.getElementById("demoQuestions");
  demoQuestionsElement.innerHTML = ""; 

  if (skills.length > 0) {
    let questionsHTML = "";
    skills.forEach(skill => {
      if (skillQuestions[skill]) {
        questionsHTML += `<h3>${skill.toUpperCase()} QUESTIONS:</h3><ul>`;
        skillQuestions[skill].forEach(question => {
          questionsHTML += `<li>${question}</li>`;
        });
        questionsHTML += `</ul><br>`; 
      } else {
        questionsHTML += `<p>No predefined questions available for skill: ${skill}</p><br>`; 
      }
    });
    demoQuestionsElement.innerHTML = questionsHTML;
  } else {
    demoQuestionsElement.innerHTML = "<p>No skills provided.</p>";
  }
}

function generateCoverLetter() {
  const userName = document.getElementById("userName").value;
  const jobTitle = document.getElementById("jobTitle").value;
  const companyName = document.getElementById("companyName").value;
  const coverMessage = document.getElementById("coverMessage").value;

  const output = `
    <p>Respected Sir/Medam ${companyName} Hiring Team,</p>
    <p>I am excited to apply for the position of <strong>${jobTitle}</strong>.</p>
    <p>${coverMessage}</p>
    <p>Best regards,<br>${userName}</p>
  `;

  document.getElementById("coverLetterOutput").innerHTML = output;
}

function addApplication() {
  const jobTitle = document.getElementById("jobTitleTrack").value;
  const companyName = document.getElementById("companyNameTrack").value;
  const applicationDate = document.getElementById("applicationDate").value;
  const status = document.getElementById("status").value;

  if (!jobTitle || !companyName || !applicationDate) {
    alert("Please fill in all fields.");
    return;
  }

  const applicationList = document.getElementById("applicationList");
  const applicationItem = document.createElement("div");
  applicationItem.classList.add("application-item");
  applicationItem.innerHTML = `
    <h4>${jobTitle} at ${companyName}</h4>
    <p>Application Date: ${applicationDate}</p>
    <p>Status: ${status}</p>
    <hr>
  `;

  applicationList.appendChild(applicationItem);
  document.getElementById("applicationForm").reset();
}

function exportResumeAsPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const age = document.getElementById("age").value;
  const experience = document.getElementById("experience").value;
  const qualifications = document.getElementById("qualifications").value;
  const skills = document.getElementById("skills").value;
  const certifications = document.getElementById("certifications").value;
  const achievements = document.getElementById("achievements").value;
  const hobbies = document.getElementById("hobbies").value;
  const languages = document.getElementById("languages").value;
  const colorScheme = document.getElementById("colorScheme").value;
  const font = document.getElementById("font").value;

  doc.setFont(font.toLowerCase().replace(/ /g, ""), "normal");
  doc.setDrawColor(colorScheme);
  doc.setLineWidth(0.5);
  doc.rect(5, 5, 200, 287);

  let y = 15; 
  doc.setFontSize(18);
  doc.setFont(undefined, "bold");
  doc.setTextColor("#000");
  doc.text("Resume", 105, y, { align: "center" });
  y += 14; 

  const addSection = (heading, content, isSkills = false) => {
    doc.setFontSize(12);

    doc.setFont(undefined, "bold");
    doc.setTextColor("#000");
    const headingText = `${heading}:`;
    const headingWidth = doc.getTextWidth(headingText);

    doc.text(headingText, 15, y); 

    doc.setFont(undefined, "normal");
    doc.setTextColor(colorScheme); 

    const contentX = 15 + headingWidth + 4; 

    if (isSkills) {
      const boxY = y + 2; 
      const boxHeight = 12;
      const boxWidth = 180 - headingWidth;

      // Draw skills box
      doc.rect(contentX, boxY, boxWidth, boxHeight, "D");
      doc.text(content, contentX + 2, boxY + 8); 
      y = boxY + boxHeight + 6; 
    } else {
      doc.text(content, contentX, y);
      y += 10; 
    }

   
    doc.setDrawColor(colorScheme);
    doc.line(10, y + 2, 200, y + 2);
    y += 10; 
  };

  addSection("Name", name);
  addSection("Email", email);
  addSection("Phone", phone);
  addSection("Age", age);
  addSection("Work Experience", experience);
  addSection("Qualifications", qualifications);
  addSection("Skills", skills, true); 
  addSection("Certifications", certifications);
  addSection("Achievements", achievements);
  addSection("Hobbies", hobbies);
  addSection("Languages", languages);
  doc.save(`${name}_Resume.pdf`);
}

function exportCoverLetterAsPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const userName = document.getElementById("userName").value;
  const jobTitle = document.getElementById("jobTitle").value;
  const companyName = document.getElementById("companyName").value;
  const coverMessage = document.getElementById("coverMessage").value;

  if (!userName || !jobTitle || !companyName || !coverMessage) {
    alert("Please fill in all fields before exporting to PDF.");
    return;
  }

  const marginLeft = 20; 
  const marginTop = 30; 
  const usableWidth = doc.internal.pageSize.width - 2 * marginLeft;
  const lineHeight = 10; 

  // Draw blue borders
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  doc.setDrawColor(0, 0, 255); 
  doc.setLineWidth(1.5); 
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20); 

  // Title
  doc.setFont("Arial", "bold");
  doc.setFontSize(16);
  doc.text("Cover Letter", pageWidth / 2, marginTop, { align: "center" });
  let cursorY = marginTop + lineHeight + 10; 

  doc.setDrawColor(0, 0, 255); 
  doc.setLineWidth(1); 
  doc.line(marginLeft, cursorY, pageWidth - marginLeft, cursorY); 
  cursorY += lineHeight;

  doc.text(`Dear Hiring Team at ${companyName},`, marginLeft, cursorY);
  cursorY += lineHeight;

  doc.text(`Position: ${jobTitle}`, marginLeft, cursorY);
  cursorY += lineHeight;

  doc.text("Message:", marginLeft, cursorY);
  cursorY += lineHeight;

  const wrappedMessage = doc.splitTextToSize(coverMessage, usableWidth);
  doc.text(wrappedMessage, marginLeft, cursorY);
  cursorY += wrappedMessage.length * lineHeight;
  cursorY += lineHeight; 
  doc.text("Best regards,", marginLeft, cursorY);
  cursorY += lineHeight;
  doc.text(userName, marginLeft, cursorY);

  
  doc.save(`${userName}_Cover_Letter.pdf`);
}


async function setJobAlert() {
  const keyword = document.getElementById('alertKeyword').value;
  const location = document.getElementById('alertLocation').value;
  const email = document.getElementById('alertEmail').value;

  if (!keyword || !location || !email) {
    alert('Please fill in all fields to set a job alert.');
    return;
  }

  try {
    const response = await fetch('/api/setJobAlert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword,
        location,
        email,
      }),
    });

    if (response.ok) {
      alert('Job alert successfully set!');
    } else {
      throw new Error('Failed to set job alert. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while setting the job alert.');
  }
}

