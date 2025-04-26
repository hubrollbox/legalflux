export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      processes: {
        Row: {
          id: string;
          status: string;
          created_by: string;
          organization_id: string;
          client_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          status: string;
          created_by: string;
          organization_id: string;
          client_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          status?: string;
          created_by?: string;
          organization_id?: string;
          client_id?: string;
          created_at?: string;
        };
      };
      process_records: {
        Row: {
          id: string;
          status: string;
          created_by: string;
          organization_id: string;
          client_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          status: string;
          created_by: string;
          organization_id: string;
          client_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          status?: string;
          created_by?: string;
          organization_id?: string;
          client_id?: string;
          created_at?: string;
        };
      };
    };
  };
};
