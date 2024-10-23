const API_BASE_URL = 'https://code-dependency-production.up.railway.app/api';

export const analyzeProject = async (gitRepoUrl) => {
  try {
    // Encode the gitRepoUrl to handle special characters
    const encodedUrl = encodeURIComponent(gitRepoUrl);
    
    // Use GET request with query parameter
    const response = await fetch(`${API_BASE_URL}/projects/analyze?gitRepoUrl=${encodedUrl}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    console.log('API response:', data); // Consider removing this in production

    return data;
  } catch (error) {
    console.error('Error analyzing project:', error);
    throw error;
  }
};

export const findClassData = (projectData, className) => {
  for (const module of projectData.modules) {
    for (const pkg of module.packages) {
      const foundClass = pkg.classes.find(cls => cls.name === className);
      if (foundClass) return foundClass;
    }
  }
  return null;
};