import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { 
  IoBriefcaseOutline, IoAddOutline, IoTrashOutline, 
  IoCreateOutline, IoLocationOutline, IoTimeOutline, IoPeopleOutline 
} from 'react-icons/io5';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { Drawer } from '../../components/common/Drawer';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';

const JobsPage = () => {
  const { jobs, addJob, deleteJob, updateJob, currentUser } = useApp();
  const navigate = useNavigate();
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState('create'); // create, edit
  const [filterStatus, setFilterStatus] = useState('All'); // All, Open, Draft, Closed

  // Form State
  const [editingJobId, setEditingJobId] = useState(null);
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Full-time');
  const [status, setStatus] = useState('Open');
  const [skillsText, setSkillsText] = useState('');
  const [description, setDescription] = useState('');
  const [recruiterName, setRecruiterName] = useState('');
  const [recruiterContact, setRecruiterContact] = useState('');

  const handleOpenCreate = () => {
    setDrawerMode('create');
    setTitle('');
    setDepartment('');
    setLocation('');
    setType('Full-time');
    setStatus('Open');
    setSkillsText('');
    setDescription('');
    setRecruiterName(currentUser?.name || '');
    setRecruiterContact(currentUser?.email || '');
    setIsDrawerOpen(true);
  };

  const handleOpenEdit = (job, e) => {
    e.stopPropagation(); // Avoid card click navigation
    setDrawerMode('edit');
    setEditingJobId(job.id);
    setTitle(job.title);
    setDepartment(job.department);
    setLocation(job.location);
    setType(job.type || 'Full-time');
    setStatus(job.status || 'Open');
    setSkillsText(job.skills ? job.skills.join(', ') : '');
    setDescription(job.description || '');
    setRecruiterName(job.recruiterName || '');
    setRecruiterContact(job.recruiterContact || '');
    setIsDrawerOpen(true);
  };

  const handleDelete = (jobId, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this job position? All matching candidate analyses will be removed.")) {
      deleteJob(jobId);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const skillsArray = skillsText
      ? skillsText.split(',').map(s => s.trim()).filter(Boolean)
      : [];

    if (drawerMode === 'create') {
      addJob({
        title,
        department,
        location,
        type,
        status,
        skills: skillsArray,
        description,
        recruiterName,
        recruiterContact
      });
    } else {
      const existingJob = jobs.find(j => j.id === editingJobId);
      updateJob({
        ...existingJob,
        title,
        department,
        location,
        type,
        status,
        skills: skillsArray,
        description,
        recruiterName,
        recruiterContact
      });
    }

    setIsDrawerOpen(false);
  };

  const filteredJobs = jobs.filter(job => {
    if (currentUser && job.recruiterId !== currentUser.uid) {
      return false;
    }
    if (filterStatus === 'All') return true;
    return job.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-left">
          <h2 className="text-xl font-bold text-textPrimary dark:text-white tracking-tight flex items-center gap-2">
            <IoBriefcaseOutline className="text-primary" />
            Job Management
          </h2>
          <p className="text-xs text-textSecondary dark:text-slate-400 mt-1">
            Post job descriptions, set required skills, and monitor applicants
          </p>
        </div>
        
        <Button 
          onClick={handleOpenCreate}
          className="w-full sm:w-auto"
        >
          <IoAddOutline className="mr-1.5 w-4 h-4 inline" /> Create New Job
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-customBorder dark:border-slate-800 pb-3">
        {['All', 'Open', 'Draft', 'Closed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterStatus(tab)}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
              filterStatus === tab
                ? 'bg-primary text-white'
                : 'text-textSecondary hover:text-textPrimary dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 border border-customBorder dark:border-slate-800 rounded-premium shadow-premium">
          <span className="text-4xl text-slate-350 dark:text-slate-600 block mb-3">💼</span>
          <p className="text-sm font-semibold text-textPrimary dark:text-white">No jobs found</p>
          <p className="text-xs text-textSecondary dark:text-slate-400 mt-1">Try changing filters or add a new job post.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <Card
              key={job.id}
              onClick={() => navigate(`/candidates?jobId=${job.id}`)}
              hoverEffect
              className="flex flex-col justify-between text-left p-6"
            >
              <div>
                <div className="flex justify-between items-start">
                  <Badge 
                    variant={job.status === 'Open' ? 'success' : job.status === 'Draft' ? 'warning' : 'danger'}
                  >
                    {job.status}
                  </Badge>
                  <span className="text-[10px] text-textSecondary dark:text-slate-500 font-medium">
                    Posted: {job.postedDate}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-textPrimary dark:text-white mt-4">{job.title}</h3>
                <p className="text-[11px] font-semibold text-primary dark:text-blue-400 mt-1">{job.department}</p>
                
                {(job.recruiterName || job.recruiterContact) && (
                  <p className="text-[10px] text-textSecondary dark:text-slate-400 mt-1 font-medium">
                    Recruiter: <span className="text-textPrimary dark:text-white font-semibold">{job.recruiterName || 'N/A'}</span> {job.recruiterContact ? `(${job.recruiterContact})` : ''}
                  </p>
                )}
                
                <div className="flex items-center gap-4 text-[10px] text-textSecondary dark:text-slate-400 mt-4 font-semibold">
                  <span className="flex items-center gap-1"><IoLocationOutline /> {job.location}</span>
                  <span className="flex items-center gap-1"><IoTimeOutline /> {job.type || 'Full-time'}</span>
                </div>

                {job.description && (
                  <p className="text-xs text-textSecondary dark:text-slate-400 mt-4 leading-relaxed line-clamp-2">
                    {job.description}
                  </p>
                )}

                {/* Skills indicators */}
                {job.skills && job.skills.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-1">
                    {job.skills.map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800 text-textSecondary dark:text-slate-300 border border-customBorder/60 dark:border-slate-750"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="mt-6 pt-4 border-t border-customBorder dark:border-slate-850 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-textSecondary dark:text-slate-400 text-xs font-bold">
                  <IoPeopleOutline size={16} />
                  <span>{job.candidatesCount} Applicants</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => handleOpenEdit(job, e)}
                    className="p-2 text-textSecondary hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
                    title="Edit Position"
                  >
                    <IoCreateOutline size={16} />
                  </button>
                  <button
                    onClick={(e) => handleDelete(job.id, e)}
                    className="p-2 text-textSecondary hover:text-customError hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all"
                    title="Delete Position"
                  >
                    <IoTrashOutline size={16} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Drawer Container */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={drawerMode === 'create' ? 'Create Job Position' : 'Edit Job Position'}
        size="md"
      >
        <form onSubmit={handleFormSubmit} className="space-y-5">
          <Input 
            label="Job Title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Senior Frontend Developer"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Department"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="e.g. Engineering"
              required
            />
            <Input 
              label="Location"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Remote (US)"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Recruiter Name"
              id="recruiterName"
              value={recruiterName}
              onChange={(e) => setRecruiterName(e.target.value)}
              placeholder="e.g. John Doe"
              required
            />
            <Input 
              label="Recruiter Contact Info"
              id="recruiterContact"
              value={recruiterContact}
              onChange={(e) => setRecruiterContact(e.target.value)}
              placeholder="e.g. email or phone number"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-textSecondary dark:text-slate-400 mb-1">
                Job Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="block w-full rounded-premium border border-customBorder dark:border-slate-800 text-sm px-3 py-2 bg-white dark:bg-slate-900 text-textPrimary dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950 focus:border-primary transition-all"
              >
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-textSecondary dark:text-slate-400 mb-1">
                Recruitment Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="block w-full rounded-premium border border-customBorder dark:border-slate-800 text-sm px-3 py-2 bg-white dark:bg-slate-900 text-textPrimary dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950 focus:border-primary transition-all"
              >
                <option value="Open">Open</option>
                <option value="Draft">Draft</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <Input 
            label="Required Skills (Comma separated)"
            id="skills"
            value={skillsText}
            onChange={(e) => setSkillsText(e.target.value)}
            placeholder="React, Node.js, AWS, Tailwind CSS"
          />

          <Textarea 
            label="Detailed Job Description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter responsibilities, daily work, and expectations..."
            rows={5}
            required
          />

          <div className="pt-4 flex gap-3 border-t border-customBorder dark:border-slate-800">
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
            >
              {drawerMode === 'create' ? 'Post Job' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default JobsPage;
