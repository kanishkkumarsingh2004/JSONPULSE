import { supabase } from './supabase'

// User operations
export const userDb = {
  async findByEmail(email: string) {
    const { data, error } = await supabase
      .from('User')
      .select('*')
      .eq('email', email)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async findById(id: string) {
    const { data, error } = await supabase
      .from('User')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async findByApiKey(apiKey: string) {
    const { data, error } = await supabase
      .from('User')
      .select('*')
      .eq('apiKey', apiKey)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async create(userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    mobile?: string
    type?: string
  }) {
    const { data, error } = await supabase
      .from('User')
      .insert([userData])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: any) {
    const { data, error } = await supabase
      .from('User')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// JsonFile operations
export const fileDb = {
  async findByUser(userId: string) {
    const { data, error } = await supabase
      .from('JsonFile')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async findByFileName(userId: string, fileName: string) {
    const { data, error } = await supabase
      .from('JsonFile')
      .select('*')
      .eq('userId', userId)
      .eq('fileName', fileName)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async create(fileData: {
    userId: string
    fileName: string
    content: string
    isPublic?: boolean
  }) {
    const { data, error } = await supabase
      .from('JsonFile')
      .insert([fileData])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updates: any) {
    const { data, error } = await supabase
      .from('JsonFile')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('JsonFile')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  async incrementViews(id: string) {
    const { data, error } = await supabase.rpc('increment_views', { file_id: id })
    if (error) throw error
    return data
  }
}
