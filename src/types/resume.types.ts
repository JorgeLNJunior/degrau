export interface Profile {
  name: string
  location: string
  phone: string
  email: string
  linkedin?: string
  portfolio?: string
  summary: string
}

export interface Experience {
  role: string
  company: string
  location: string
  period: string
  bullets: string[]
}

export interface Skills {
  hardSkills: string[]
  softSkills: string[]
}

export interface Education {
  degree: string
  institution: string
  year: number
}

export interface Resume {
  profile: Profile
  experience: Experience[]
  skills: Skills
  education: Education[]
}
