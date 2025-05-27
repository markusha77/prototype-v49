import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Camera, 
  Plus, 
  X, 
  Save, 
  Globe, 
  Lock, 
  Users, 
  Shield, 
  Trash2, 
  UserMinus,
  ExternalLink,
  Image as ImageIcon,
  Calendar,
  Briefcase,
  Settings,
  Eye,
  EyeOff
} from 'lucide-react'
import { Navbar } from './Navbar'
import useContentLoader from '../../hooks/useContentLoader'
import LoadingIndicator from '../common/LoadingIndicator'

interface CommunityEditData {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  logo: string;
  coverImage: string;
  website: string;
  isPrivate: boolean;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    discord?: string;
    instagram?: string;
  };
  communityLinks: {
    id: string;
    title: string;
    url: string;
  }[];
  photoGallery: string[];
  upcomingEvents: {
    id: string;
    title: string;
    description: string;
    date: string;
    image: string;
  }[];
  featuredProjects: {
    id: string;
    title: string;
    description: string;
    image: string;
    author: string;
  }[];
  members: {
    id: string;
    name: string;
    avatar: string;
    role: 'admin' | 'moderator' | 'member';
    joinedAt: string;
  }[];
}

// Mock data for editing
const mockCommunityData: CommunityEditData = {
  id: '1',
  name: 'EcoTech Innovators',
  description: 'A community of developers, designers, and entrepreneurs building technology solutions for environmental sustainability.',
  longDescription: 'EcoTech Innovators brings together passionate individuals from diverse backgrounds who share a common goal: leveraging technology to address environmental challenges. Our community focuses on developing sustainable solutions, sharing knowledge, and collaborating on projects that make a positive impact on our planet.',
  logo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
  coverImage: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
  website: 'https://ecotechinnovators.example.com',
  isPrivate: false,
  socialLinks: {
    twitter: 'https://twitter.com/ecotechinnovators',
    linkedin: 'https://linkedin.com/company/ecotechinnovators',
    github: 'https://github.com/ecotechinnovators'
  },
  communityLinks: [
    { id: '1', title: 'Community Guidelines', url: 'https://example.com/guidelines' },
    { id: '2', title: 'Resource Library', url: 'https://example.com/resources' }
  ],
  photoGallery: [
    'https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  upcomingEvents: [
    {
      id: '1',
      title: 'Green Tech Hackathon',
      description: 'Join us for a 48-hour hackathon focused on sustainable technology solutions.',
      date: '2024-02-15',
      image: 'https://images.unsplash.com/photo-1540304453527-62f979142a17?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ],
  featuredProjects: [
    {
      id: '1',
      title: 'Solar Panel Optimizer',
      description: 'AI-powered system to optimize solar panel efficiency',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: 'Elena Rodriguez'
    }
  ],
  members: [
    {
      id: '1',
      name: 'Elena Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      role: 'admin',
      joinedAt: '2023-01-15'
    },
    {
      id: '2',
      name: 'Marcus Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      role: 'moderator',
      joinedAt: '2023-02-20'
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80',
      role: 'member',
      joinedAt: '2023-03-10'
    }
  ]
};

const CommunityEditPage: React.FC = () => {
  const { communityId } = useParams<{ communityId: string }>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('basic');
  const [communityData, setCommunityData] = useState<CommunityEditData>(mockCommunityData);
  const [hasChanges, setHasChanges] = useState(false);
  
  const { 
    isLoading, 
    contentStyle, 
    prepareContent 
  } = useContentLoader({
    scrollToTop: true,
    loadingDelay: 200,
    fadeInDuration: 300
  });

  useEffect(() => {
    prepareContent();
  }, [communityId, prepareContent]);

  const handleSave = () => {
    console.log('Saving community data:', communityData);
    setHasChanges(false);
    // TODO: Implement actual save functionality
  };

  const handleInputChange = (field: string, value: any) => {
    setCommunityData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleSocialLinkChange = (platform: string, url: string) => {
    setCommunityData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: url
      }
    }));
    setHasChanges(true);
  };

  const addCommunityLink = () => {
    const newLink = {
      id: Date.now().toString(),
      title: '',
      url: ''
    };
    setCommunityData(prev => ({
      ...prev,
      communityLinks: [...prev.communityLinks, newLink]
    }));
    setHasChanges(true);
  };

  const removeCommunityLink = (id: string) => {
    setCommunityData(prev => ({
      ...prev,
      communityLinks: prev.communityLinks.filter(link => link.id !== id)
    }));
    setHasChanges(true);
  };

  const updateCommunityLink = (id: string, field: string, value: string) => {
    setCommunityData(prev => ({
      ...prev,
      communityLinks: prev.communityLinks.map(link =>
        link.id === id ? { ...link, [field]: value } : link
      )
    }));
    setHasChanges(true);
  };

  const addPhotoToGallery = () => {
    const newPhoto = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
    setCommunityData(prev => ({
      ...prev,
      photoGallery: [...prev.photoGallery, newPhoto]
    }));
    setHasChanges(true);
  };

  const removePhotoFromGallery = (index: number) => {
    setCommunityData(prev => ({
      ...prev,
      photoGallery: prev.photoGallery.filter((_, i) => i !== index)
    }));
    setHasChanges(true);
  };

  const kickMember = (memberId: string) => {
    setCommunityData(prev => ({
      ...prev,
      members: prev.members.filter(member => member.id !== memberId)
    }));
    setHasChanges(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <LoadingIndicator 
            size="md" 
            color="indigo" 
            message="Loading community settings..." 
          />
        </div>
      </div>
    );
  }

  const sidebarSections = [
    { id: 'basic', label: 'Basic Info', icon: Settings },
    { id: 'social', label: 'Social Links', icon: ExternalLink },
    { id: 'links', label: 'Community Links', icon: Globe },
    { id: 'gallery', label: 'Photo Gallery', icon: ImageIcon },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'members', label: 'Members & Security', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div style={contentStyle}>
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link 
                  to={`/community/${communityId}`}
                  className="group inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5 font-semibold mr-4"
                >
                  <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span>Back to Community</span>
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 ml-4">Edit Community</h1>
              </div>
              
              <div className="flex items-center space-x-3">
                {hasChanges && (
                  <span className="text-sm text-orange-600 font-medium">Unsaved changes</span>
                )}
                <button
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-8">
                <nav className="space-y-2">
                  {sidebarSections.map(section => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                          activeSection === section.id
                            ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        {section.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {/* Basic Info Section */}
                {activeSection === 'basic' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
                    
                    {/* Cover Image */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                      <div className="relative">
                        <img 
                          src={communityData.coverImage} 
                          alt="Cover"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors">
                          <Camera className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Logo */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Community Logo</label>
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img 
                            src={communityData.logo} 
                            alt="Logo"
                            className="h-20 w-20 rounded-lg object-cover"
                          />
                          <button className="absolute -top-2 -right-2 p-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors">
                            <Camera className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="text-sm text-gray-500">
                          <p>Recommended: 200x200px</p>
                          <p>Max file size: 5MB</p>
                        </div>
                      </div>
                    </div>

                    {/* Community Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Community Name</label>
                      <input
                        type="text"
                        value={communityData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    {/* Short Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
                      <textarea
                        value={communityData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Brief description of your community..."
                      />
                    </div>

                    {/* Long Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">About Section</label>
                      <textarea
                        value={communityData.longDescription}
                        onChange={(e) => handleInputChange('longDescription', e.target.value)}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Detailed description of your community, goals, and values..."
                      />
                    </div>

                    {/* Website */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
                      <input
                        type="url"
                        value={communityData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="https://your-website.com"
                      />
                    </div>

                    {/* Privacy Setting */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Community Privacy</label>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="privacy"
                            checked={!communityData.isPrivate}
                            onChange={() => handleInputChange('isPrivate', false)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                          />
                          <div className="ml-3">
                            <div className="flex items-center">
                              <Globe className="h-4 w-4 mr-2 text-green-600" />
                              <span className="font-medium text-gray-900">Public</span>
                            </div>
                            <p className="text-sm text-gray-500">Anyone can see and join this community</p>
                          </div>
                        </label>
                        
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="privacy"
                            checked={communityData.isPrivate}
                            onChange={() => handleInputChange('isPrivate', true)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                          />
                          <div className="ml-3">
                            <div className="flex items-center">
                              <Lock className="h-4 w-4 mr-2 text-orange-600" />
                              <span className="font-medium text-gray-900">Private</span>
                            </div>
                            <p className="text-sm text-gray-500">Only members can see content, requires approval to join</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Social Links Section */}
                {activeSection === 'social' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900">Social Links</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries({
                        twitter: 'Twitter',
                        linkedin: 'LinkedIn',
                        github: 'GitHub',
                        discord: 'Discord',
                        instagram: 'Instagram'
                      }).map(([platform, label]) => (
                        <div key={platform}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                          <input
                            type="url"
                            value={communityData.socialLinks[platform as keyof typeof communityData.socialLinks] || ''}
                            onChange={(e) => handleSocialLinkChange(platform, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder={`https://${platform}.com/your-profile`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Community Links Section */}
                {activeSection === 'links' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold text-gray-900">Community Links</h2>
                      <button
                        onClick={addCommunityLink}
                        className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Link
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {communityData.communityLinks.map(link => (
                        <div key={link.id} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={link.title}
                              onChange={(e) => updateCommunityLink(link.id, 'title', e.target.value)}
                              placeholder="Link title"
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <input
                              type="url"
                              value={link.url}
                              onChange={(e) => updateCommunityLink(link.id, 'url', e.target.value)}
                              placeholder="https://example.com"
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                          <button
                            onClick={() => removeCommunityLink(link.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Photo Gallery Section */}
                {activeSection === 'gallery' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold text-gray-900">Photo Gallery</h2>
                      <button
                        onClick={addPhotoToGallery}
                        className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Photo
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {communityData.photoGallery.map((photo, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={photo} 
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removePhotoFromGallery(index)}
                            className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Events Section */}
                {activeSection === 'events' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
                      <button className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Event
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {communityData.upcomingEvents.map(event => (
                        <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start space-x-4">
                            <img 
                              src={event.image} 
                              alt={event.title}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{event.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                              <p className="text-sm text-gray-500 mt-2">{event.date}</p>
                            </div>
                            <div className="flex space-x-2">
                              <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects Section */}
                {activeSection === 'projects' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold text-gray-900">Featured Projects</h2>
                      <button className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        <Plus className="h-4 w-4 mr-2" />
                        Feature Project
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {communityData.featuredProjects.map(project => (
                        <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start space-x-4">
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{project.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                              <p className="text-sm text-gray-500 mt-2">by {project.author}</p>
                            </div>
                            <div className="flex space-x-2">
                              <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                <EyeOff className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Members & Security Section */}
                {activeSection === 'members' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900">Members & Security</h2>
                    
                    <div className="space-y-4">
                      {communityData.members.map(member => (
                        <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={member.avatar} 
                              alt={member.name}
                              className="h-10 w-10 rounded-full"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{member.name}</p>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  member.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                  member.role === 'moderator' ? 'bg-blue-100 text-blue-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {member.role}
                                </span>
                                <span className="text-sm text-gray-500">
                                  Joined {new Date(member.joinedAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {member.role !== 'admin' && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => kickMember(member.id)}
                                className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                              >
                                <UserMinus className="h-3 w-3 mr-1" />
                                Remove
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Danger Zone */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
                      <div className="space-y-3">
                        <button className="w-full flex items-center justify-center px-4 py-3 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Community
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityEditPage;
