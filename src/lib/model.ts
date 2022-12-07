export interface Drift {
    summary: Summary
    managed: Managed[]
    unmanaged: Unmanaged[]
    missing: Missing[]
    differences: any
    coverage: number
    alerts: Alerts
    provider_name: string
    provider_version: string
  }
  
  export interface Summary {
    total_resources: number
    total_changed: number
    total_unmanaged: number
    total_missing: number
    total_managed: number
  }
  
  export interface Managed {
    id: string
    type: string
    source?: Source
  }
  
  export interface Source {
    source: string
    namespace: string
    internal_name: string
  }
  
  export interface Unmanaged {
    id: string
    type: string
  }
  
  export interface Missing {
    id: string
    type: string
  }
  
  export interface Alerts {
    "": GeneratedType[]
  }
  
  export interface GeneratedType {
    message: string
  }