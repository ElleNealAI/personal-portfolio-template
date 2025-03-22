from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
import databutton as db
import json
import re

router = APIRouter()

# Path to store projects data in databutton storage
PROJECTS_STORAGE_KEY = "portfolio_projects"

# Function to sanitize storage keys
def sanitize_storage_key(key: str) -> str:
    """Sanitize storage key to only allow alphanumeric and ._- symbols"""
    return re.sub(r'[^a-zA-Z0-9._-]', '', key)

# Pydantic model for project data
class ProjectBase(BaseModel):
    title: str
    description: str
    category: str
    imageUrl: str
    tags: List[str]

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(ProjectBase):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    imageUrl: Optional[str] = None
    tags: Optional[List[str]] = None

class Project(ProjectBase):
    id: int

class ProjectsResponse(BaseModel):
    projects: List[Project]

# Function to get all projects
def get_projects() -> list:
    try:
        projects = db.storage.json.get(sanitize_storage_key(PROJECTS_STORAGE_KEY), default=[])
        return projects
    except Exception as e:
        print(f"Error getting projects: {e}")
        return []

# Function to save projects
def save_projects(projects: list) -> None:
    try:
        db.storage.json.put(sanitize_storage_key(PROJECTS_STORAGE_KEY), projects)
    except Exception as e:
        print(f"Error saving projects: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to save projects: {str(e)}")

# Get all projects
@router.get("/projects", response_model=ProjectsResponse)
def list_projects():
    projects = get_projects()
    return {"projects": projects}

# Get a specific project by ID
@router.get("/projects/{project_id}", response_model=Project)
def get_project(project_id: int):
    projects = get_projects()
    
    for project in projects:
        if project.get("id") == project_id:
            return project
    
    raise HTTPException(status_code=404, detail="Project not found")

# Create a new project
@router.post("/projects", response_model=Project, status_code=201)
def create_project(project: ProjectCreate):
    projects = get_projects()
    
    # Generate a new ID (max existing ID + 1 or 1 if no projects exist)
    new_id = 1
    if projects:
        new_id = max(project.get("id", 0) for project in projects) + 1
    
    # Create the new project
    new_project = {
        "id": new_id,
        "title": project.title,
        "description": project.description,
        "category": project.category,
        "imageUrl": project.imageUrl,
        "tags": project.tags
    }
    
    # Add to projects list
    projects.append(new_project)
    
    # Save updated projects list
    save_projects(projects)
    
    return new_project

# Update a project
@router.put("/projects/{project_id}", response_model=Project)
def update_project(project_id: int, project_update: ProjectUpdate):
    projects = get_projects()
    
    # Find the project to update
    for i, project in enumerate(projects):
        if project.get("id") == project_id:
            # Update only the fields that are provided
            update_data = project_update.dict(exclude_unset=True)
            projects[i].update({k: v for k, v in update_data.items() if v is not None})
            
            # Save updated projects list
            save_projects(projects)
            
            return projects[i]
    
    raise HTTPException(status_code=404, detail="Project not found")

# Delete a project
@router.delete("/projects/{project_id}", status_code=204)
def delete_project(project_id: int):
    projects = get_projects()
    
    # Find the project to delete
    for i, project in enumerate(projects):
        if project.get("id") == project_id:
            # Remove the project
            del projects[i]
            
            # Save updated projects list
            save_projects(projects)
            
            return
    
    raise HTTPException(status_code=404, detail="Project not found")

# Initialize projects with sample data if none exist
@router.post("/projects/initialize", response_model=ProjectsResponse)
def initialize_projects():
    projects = get_projects()
    
    # Only initialize if no projects exist
    if not projects:
        # Sample project data from the existing Projects.tsx file
        sample_projects = [
            {
                "id": 1,
                "title": "Minimalist Brand Identity",
                "description": "A clean, modern brand identity for a luxury fashion label featuring custom typography and a refined color palette.",
                "category": "Branding",
                "imageUrl": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1170&auto=format&fit=crop",
                "tags": ["Brand Identity", "Logo Design", "Typography"]
            },
            {
                "id": 2,
                "title": "E-Commerce Website Design",
                "description": "Responsive e-commerce platform with intuitive navigation and seamless checkout experience.",
                "category": "Web Design",
                "imageUrl": "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1164&auto=format&fit=crop",
                "tags": ["UI/UX", "Web Development", "E-commerce"]
            },
            {
                "id": 3,
                "title": "Abstract Photography Series",
                "description": "Collection of abstract architectural photographs exploring light, shadow, and form.",
                "category": "Photography",
                "imageUrl": "https://images.unsplash.com/photo-1545178803-4056771d60a3?q=80&w=1170&auto=format&fit=crop",
                "tags": ["Photography", "Abstract", "Architecture"]
            },
            {
                "id": 4,
                "title": "Mobile App Interface",
                "description": "Health tracking application with intuitive data visualization and user-friendly interface.",
                "category": "UI/UX",
                "imageUrl": "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1074&auto=format&fit=crop",
                "tags": ["Mobile Design", "UI/UX", "App Development"]
            },
            {
                "id": 5,
                "title": "Packaging Design",
                "description": "Sustainable packaging solution for an organic food brand with distinctive visual language.",
                "category": "Branding",
                "imageUrl": "https://images.unsplash.com/photo-1635405446898-da87459d15e3?q=80&w=1025&auto=format&fit=crop",
                "tags": ["Packaging", "Sustainable Design", "Branding"]
            },
            {
                "id": 6,
                "title": "Editorial Layout Design",
                "description": "Magazine spread layout with innovative typography and visual hierarchy.",
                "category": "Print",
                "imageUrl": "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1287&auto=format&fit=crop",
                "tags": ["Editorial Design", "Typography", "Print"]
            }
        ]
        
        # Save sample projects
        save_projects(sample_projects)
        projects = sample_projects
    
    return {"projects": projects}
