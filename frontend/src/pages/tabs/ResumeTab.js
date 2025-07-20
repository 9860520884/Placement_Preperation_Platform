import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Avatar,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Description,
  Person,
  WorkHistory,
  School,
  Build,
  Edit,
  Delete,
  Add,
  ArrowBack,
  ArrowForward
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './ResumeTab.css';

const steps = ['Personal Info', 'Education', 'Experience', 'Skills', 'Finalize'];

// Validation schemas for each step
const personalInfoSchema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  linkedIn: yup.string().url('Must be a valid URL'),
  address: yup.string(),
  summary: yup.string().max(200, 'Summary should be at most 200 characters')
});

const educationSchema = yup.object({
  education: yup.array().of(
    yup.object({
      institution: yup.string().required('Institution is required'),
      degree: yup.string().required('Degree is required'),
      field: yup.string().required('Field of study is required'),
      startYear: yup.string().required('Start year is required'),
      endYear: yup.string(),
      gpa: yup.string()
    })
  )
});

const experienceSchema = yup.object({
  experience: yup.array().of(
    yup.object({
      jobTitle: yup.string().required('Job title is required'),
      company: yup.string().required('Company is required'),
      startDate: yup.string().required('Start date is required'),
      endDate: yup.string(),
      description: yup.string().required('Description is required')
    })
  )
});

const skillsSchema = yup.object({
  technicalSkills: yup.array().min(1, 'At least one skill is required'),
  softSkills: yup.array(),
  certifications: yup.array()
});

const ResumeTab = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  // Formik form for all steps
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      linkedIn: '',
      address: '',
      summary: '',
      education: [{
        institution: '',
        degree: '',
        field: '',
        startYear: '',
        endYear: '',
        gpa: ''
      }],
      experience: [{
        jobTitle: '',
        company: '',
        startDate: '',
        endDate: '',
        description: ''
      }],
      technicalSkills: [],
      softSkills: [],
      certifications: []
    },
    validationSchema: activeStep === 0 ? personalInfoSchema :
      activeStep === 1 ? educationSchema :
        activeStep === 2 ? experienceSchema :
          activeStep === 3 ? skillsSchema : null,
    onSubmit: (values) => {
      if (activeStep === steps.length - 1) {
        // Handle final submission (e.g., generate PDF)
        showSnackbar('Resume generated successfully!', 'success');
      } else {
        handleNext();
      }
    }
  });

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleNext = () => {
    formik.validateForm().then(errors => {
      if (Object.keys(errors).length === 0) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        showSnackbar('Please fill all required fields correctly', 'error');
      }
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAddEducation = () => {
    formik.setFieldValue('education', [
      ...formik.values.education,
      {
        institution: '',
        degree: '',
        field: '',
        startYear: '',
        endYear: '',
        gpa: ''
      }
    ]);
  };

  const handleRemoveEducation = (index) => {
    const newEducation = [...formik.values.education];
    newEducation.splice(index, 1);
    formik.setFieldValue('education', newEducation);
  };

  const handleAddExperience = () => {
    formik.setFieldValue('experience', [
      ...formik.values.experience,
      {
        jobTitle: '',
        company: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ]);
  };

  const handleRemoveExperience = (index) => {
    const newExperience = [...formik.values.experience];
    newExperience.splice(index, 1);
    formik.setFieldValue('experience', newExperience);
  };

  const handleAddSkill = (field) => {
    const input = document.getElementById(`${field}-input`);
    if (input.value.trim()) {
      formik.setFieldValue(field, [...formik.values[field], input.value.trim(),]);
      input.value = '';
    }
  };

  const handleRemoveSkill = (field, index) => {
    const newSkills = [...formik.values[field]];
    newSkills.splice(index, 1);
    formik.setFieldValue(field, newSkills);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box className="form-section">
            <TextField
              name="fullName"
              label="Full Name *"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
            <TextField
              name="email"
              label="Email *"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              name="phone"
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <TextField
              name="linkedIn"
              label="LinkedIn Profile"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formik.values.linkedIn}
              onChange={formik.handleChange}
              error={formik.touched.linkedIn && Boolean(formik.errors.linkedIn)}
              helperText={formik.touched.linkedIn && formik.errors.linkedIn}
            />
            <TextField
              name="address"
              label="Address"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            <TextField
              name="summary"
              label="Professional Summary"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={formik.values.summary}
              onChange={formik.handleChange}
              error={formik.touched.summary && Boolean(formik.errors.summary)}
              helperText={formik.touched.summary && formik.errors.summary}
            />
          </Box>
        );
      case 1:
        return (
          <Box className="form-section">
            {formik.values.education.map((edu, index) => (
              <Box
                key={index}
                className="multi-field-group"
                sx={{ mb: 3, p: 2, border: '1px solid #eee', borderRadius: 1 }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="subtitle1">Education #{index + 1}</Typography>
                  {formik.values.education.length > 1 && (
                    <IconButton onClick={() => handleRemoveEducation(index)} color="error">
                      <Delete />
                    </IconButton>
                  )}
                </Box>
                <TextField
                  name={`education[${index}].institution`}
                  label="Institution *"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={edu.institution}
                  onChange={formik.handleChange}
                  error={formik.touched.education?.[index]?.institution &&
                    Boolean(formik.errors.education?.[index]?.institution)}
                  helperText={formik.touched.education?.[index]?.institution &&
                    formik.errors.education?.[index]?.institution}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name={`education[${index}].degree`}
                      label="Degree *"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={edu.degree}
                      onChange={formik.handleChange}
                      error={formik.touched.education?.[index]?.degree &&
                        Boolean(formik.errors.education?.[index]?.degree)}
                      helperText={formik.touched.education?.[index]?.degree &&
                        formik.errors.education?.[index]?.degree}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name={`education[${index}].field`}
                      label="Field of Study *"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={edu.field}
                      onChange={formik.handleChange}
                      error={formik.touched.education?.[index]?.field &&
                        Boolean(formik.errors.education?.[index]?.field)}
                      helperText={formik.touched.education?.[index]?.field &&
                        formik.errors.education?.[index]?.field}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name={`education[${index}].startYear`}
                      label="Start Year *"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={edu.startYear}
                      onChange={formik.handleChange}
                      error={formik.touched.education?.[index]?.startYear &&
                        Boolean(formik.errors.education?.[index]?.startYear)}
                      helperText={formik.touched.education?.[index]?.startYear &&
                        formik.errors.education?.[index]?.startYear}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name={`education[${index}].endYear`}
                      label="End Year (or expected)"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={edu.endYear}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                </Grid>
                <TextField
                  name={`education[${index}].gpa`}
                  label="GPA (optional)"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={edu.gpa}
                  onChange={formik.handleChange}
                />
              </Box>
            ))}
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={handleAddEducation}
              sx={{ mt: 1 }}
            >
              Add Another Education
            </Button>
          </Box>
        );
      case 2:
        return (
          <Box className="form-section">
            {formik.values.experience.map((exp, index) => (
              <Box
                key={index}
                className="multi-field-group"
                sx={{ mb: 3, p: 2, border: '1px solid #eee', borderRadius: 1 }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="subtitle1">Experience #{index + 1}</Typography>
                  {formik.values.experience.length > 1 && (
                    <IconButton onClick={() => handleRemoveExperience(index)} color="error">
                      <Delete />
                    </IconButton>
                  )}
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name={`experience[${index}].jobTitle`}
                      label="Job Title *"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={exp.jobTitle}
                      onChange={formik.handleChange}
                      error={formik.touched.experience?.[index]?.jobTitle &&
                        Boolean(formik.errors.experience?.[index]?.jobTitle)}
                      helperText={formik.touched.experience?.[index]?.jobTitle &&
                        formik.errors.experience?.[index]?.jobTitle}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name={`experience[${index}].company`}
                      label="Company *"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={exp.company}
                      onChange={formik.handleChange}
                      error={formik.touched.experience?.[index]?.company &&
                        Boolean(formik.errors.experience?.[index]?.company)}
                      helperText={formik.touched.experience?.[index]?.company &&
                        formik.errors.experience?.[index]?.company}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name={`experience[${index}].startDate`}
                      label="Start Date *"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={exp.startDate}
                      onChange={formik.handleChange}
                      error={formik.touched.experience?.[index]?.startDate &&
                        Boolean(formik.errors.experience?.[index]?.startDate)}
                      helperText={formik.touched.experience?.[index]?.startDate &&
                        formik.errors.experience?.[index]?.startDate}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name={`experience[${index}].endDate`}
                      label="End Date (or present)"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={exp.endDate}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                </Grid>
                <TextField
                  name={`experience[${index}].description`}
                  label="Description *"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  value={exp.description}
                  onChange={formik.handleChange}
                  error={formik.touched.experience?.[index]?.description &&
                    Boolean(formik.errors.experience?.[index]?.description)}
                  helperText={formik.touched.experience?.[index]?.description &&
                    formik.errors.experience?.[index]?.description}
                />
              </Box>
            ))}
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={handleAddExperience}
              sx={{ mt: 1 }}
            >
              Add Another Experience
            </Button>
          </Box>
        );
      case 3:
        return (
          <Box className="form-section">
            <Box mb={3}>
              <Typography variant="subtitle1" gutterBottom>Technical Skills *</Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <TextField
                  id="technicalSkills-input"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  placeholder="e.g., JavaScript, React, Node.js"
                />
                <Button
                  variant="contained"
                  onClick={() => handleAddSkill('technicalSkills')}
                  startIcon={<Add />}
                >
                  Add
                </Button>
              </Box>
              <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                {formik.values.technicalSkills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    onDelete={() => handleRemoveSkill('technicalSkills', index)}
                  />
                ))}
              </Box>
              {formik.touched.technicalSkills && formik.errors.technicalSkills && (
                <Typography color="error" variant="caption">
                  {formik.errors.technicalSkills}
                </Typography>
              )}
            </Box>

            <Box mb={3}>
              <Typography variant="subtitle1" gutterBottom>Soft Skills</Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <TextField
                  id="softSkills-input"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  placeholder="e.g., Communication, Leadership"
                />
                <Button
                  variant="outlined"
                  onClick={() => handleAddSkill('softSkills')}
                  startIcon={<Add />}
                >
                  Add
                </Button>
              </Box>
              <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                {formik.values.softSkills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    onDelete={() => handleRemoveSkill('softSkills', index)}
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>

            <Box mb={3}>
              <Typography variant="subtitle1" gutterBottom>Certifications</Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <TextField
                  id="certifications-input"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  placeholder="e.g., AWS Certified, PMP"
                />
                <Button
                  variant="outlined"
                  onClick={() => handleAddSkill('certifications')}
                  startIcon={<Add />}
                >
                  Add
                </Button>
              </Box>
              <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                {formik.values.certifications.map((cert, index) => (
                  <Chip
                    key={index}
                    label={cert}
                    onDelete={() => handleRemoveSkill('certifications', index)}
                    variant="outlined"
                    color="primary"
                  />
                ))}
              </Box>
            </Box>
          </Box>
        );
      case 4:
        return (
          <Box className="preview-section">
            <Typography variant="h6" gutterBottom>
              Your Resume is Ready!
            </Typography>
            <Paper className="resume-preview" sx={{ p: 3 }}>
              <Box textAlign="center" mb={3}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {formik.values.fullName}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {formik.values.email} | {formik.values.phone} | {formik.values.linkedIn}
                </Typography>
                {formik.values.address && (
                  <Typography variant="body2" color="text.secondary">
                    {formik.values.address}
                  </Typography>
                )}
              </Box>

              {formik.values.summary && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Box mb={3}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>SUMMARY</Typography>
                    <Typography variant="body1">{formik.values.summary}</Typography>
                  </Box>
                </>
              )}

              <Divider sx={{ my: 2 }} />
              <Box mb={3}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>EDUCATION</Typography>
                {formik.values.education.map((edu, index) => (
                  <Box key={index} mb={2}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {edu.institution}
                    </Typography>
                    <Typography variant="body1">
                      {edu.degree} in {edu.field}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {edu.startYear} - {edu.endYear || 'Present'} {edu.gpa && `| GPA: ${edu.gpa}`}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {formik.values.experience.length > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Box mb={3}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>EXPERIENCE</Typography>
                    {formik.values.experience.map((exp, index) => (
                      <Box key={index} mb={2}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {exp.jobTitle}
                        </Typography>
                        <Typography variant="body1">{exp.company}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {exp.startDate} - {exp.endDate || 'Present'}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                          {exp.description}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </>
              )}

              <Divider sx={{ my: 2 }} />
              <Box mb={3}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>SKILLS</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2">Technical Skills</Typography>
                    <List dense>
                      {formik.values.technicalSkills.map((skill, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={`• ${skill}`} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2">Soft Skills</Typography>
                    <List dense>
                      {formik.values.softSkills.map((skill, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={`• ${skill}`} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </Box>

              {formik.values.certifications.length > 0 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Box mb={3}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>CERTIFICATIONS</Typography>
                    <List dense>
                      {formik.values.certifications.map((cert, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={`• ${cert}`} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </>
              )}
            </Paper>
            <Box display="flex" justifyContent="center" gap={2} mt={3}>
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => setActiveStep(0)}
              >
                Edit Resume
              </Button>
              <Button
                variant="contained"
                className="download-button"
                startIcon={<Description />}
              >
                Download PDF
              </Button>
            </Box>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box className="resume-tab">
      <Typography variant="h4" className="tab-header">
        <Description fontSize="large" sx={{ mr: 1 }} />
        Resume Builder
      </Typography>

      <Typography variant="body1" className="tab-subheader">
        Create a professional resume tailored for tech placements
      </Typography>

      <Paper className="resume-stepper" sx={{ p: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => {
            return (
              <Step key={label}>
                <StepLabel className="step-label">
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <Box className="step-content" sx={{ my: 3 }}>
          {renderStepContent(activeStep)}
        </Box>

        {activeStep !== steps.length - 1 && (
          <Box className="stepper-actions" display="flex" justifyContent="space-between">
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className="back-button"
              startIcon={<ArrowBack />}
            >
              Back
            </Button>

            <Button
              variant="contained"
              onClick={formik.handleSubmit}
              className="next-button"
              endIcon={<ArrowForward />}
            >
              {activeStep === steps.length - 2 ? 'Review Resume' : 'Next'}
            </Button>
          </Box>
        )}
      </Paper>

      {activeStep !== steps.length - 1 && (
        <Box className="templates-section" sx={{ mt: 4 }}>
          <Typography variant="h6" className="section-title" sx={{ mb: 2 }}>
            Resume Templates
          </Typography>
          <Box className="templates-grid" display="flex" gap={2} overflow="auto" py={1}>
            {[1, 2, 3].map((template) => (
              <Paper
                key={template}
                className="template-card"
                sx={{
                  p: 2,
                  minWidth: 200,
                  cursor: 'pointer',
                  border: selectedTemplate === template ? '2px solid #1976d2' : '1px solid #ddd'
                }}
                onClick={() => setSelectedTemplate(template)}
              >
                <Box className="template-preview" textAlign="center">
                  <Avatar sx={{
                    bgcolor: template === 1 ? '#1976d2' : template === 2 ? '#4caf50' : '#9c27b0',
                    width: 80,
                    height: 80,
                    mx: 'auto',
                    mb: 1
                  }}>
                    {template === 1 && <Person sx={{ fontSize: 40 }} />}
                    {template === 2 && <WorkHistory sx={{ fontSize: 40 }} />}
                    {template === 3 && <School sx={{ fontSize: 40 }} />}
                  </Avatar>
                  <Typography variant="subtitle1">Template {template}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {template === 1 ? 'Professional' : template === 2 ? 'Modern' : 'Academic'}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ResumeTab;