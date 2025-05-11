import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navigation } from '../components/Navigation';
import { Camera, User, Edit, Trash2, ArrowLeft } from 'lucide-react';

const Profile = () => {
  const { currentUser, updateProfile, deleteAccount, logout } = useAuth();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(currentUser?.name || '');
  const [profileImage, setProfileImage] = useState(currentUser?.photoURL || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Montserrat:wght@700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      await updateProfile({
        name: nickname,
        photoURL: profileImage
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await deleteAccount();
        logout();
        navigate('/');
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 rounded-full hover:bg-gray-100 mr-2 transition"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            My Profile
          </h1>
        </div>
        
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-md p-6 border border-white/50 max-w-2xl mx-auto">
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={40} className="text-gray-400" />
                )}
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition">
                  <Camera size={16} />
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
            
            <div className="text-center">
              <p className="text-gray-500 text-sm mb-1">Signed in as</p>
              <p className="text-gray-700 font-medium">{currentUser?.email}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nickname</label>
              {isEditing ? (
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your nickname"
                />
              ) : (
                <div className="px-4 py-2 bg-gray-50 rounded-lg">
                  <p className="text-gray-800">{nickname || 'Not set'}</p>
                </div>
              )}
            </div>
            
            {isEditing ? (
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition font-medium"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setNickname(currentUser?.name || '');
                    setProfileImage(currentUser?.photoURL || '');
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 py-2 px-4 rounded-lg hover:bg-indigo-100 transition font-medium"
              >
                <Edit size={16} />
                Edit Profile
              </button>
            )}
            
            <div className="border-t border-gray-200 pt-4 mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Account Actions</h3>
              <button
                onClick={() => setIsDeleting(!isDeleting)}
                className="w-full flex items-center justify-between text-red-600 py-2 px-4 rounded-lg hover:bg-red-50 transition"
              >
                <span className="flex items-center gap-2">
                  <Trash2 size={16} />
                  Delete Account
                </span>
                <span className={`transform transition-transform ${isDeleting ? 'rotate-180' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
              
              {isDeleting && (
                <div className="mt-3 p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-700 mb-3">
                    Deleting your account will permanently remove all your data including shopping lists. This action cannot be undone.
                  </p>
                  <button
                    onClick={handleDeleteAccount}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition font-medium text-sm"
                  >
                    Confirm Delete Account
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
