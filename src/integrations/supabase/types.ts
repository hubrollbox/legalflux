export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

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
      };
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
      };
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
      };
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
      };
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
      };
  public: {
    Tables: {
      process_records: {
        Row: {
          id: string;
          status: string;
          created_by: string;
          organization_id: string;
          client_id: string;
          created_at: string;
        };
      };
  processes: {
    Row: {
      id: string;
      status: string;
      created_by: string;
      organization_id: string;
      client_id: string;
      created_at: string;
    };
  };

  public: {
  public: {
    Tables: {
      advogados: {
        Row: {
          criado_em: string | null
          escritorio_id: string | null
          id: string
          user_id: string
        }
        Insert: {
          criado_em?: string | null
          escritorio_id?: string | null
          id?: string
          user_id: string
        }
        Update: {
          criado_em?: string | null
          escritorio_id?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "advogados_escritorio_id_fkey"
            columns: ["escritorio_id"]
            isOneToOne: false
            referencedRelation: "escritorios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "advogados_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_advogado_escritorio"
            columns: ["escritorio_id"]
            isOneToOne: false
            referencedRelation: "escritorios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_advogado_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      assinaturas: {
        Row: {
          criado_em: string | null
          id: string
          plano_id: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          criado_em?: string | null
          id?: string
          plano_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          criado_em?: string | null
          id?: string
          plano_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assinaturas_plano_id_fkey"
            columns: ["plano_id"]
            isOneToOne: false
            referencedRelation: "planos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assinaturas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_assinatura_plano"
            columns: ["plano_id"]
            isOneToOne: false
            referencedRelation: "planos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_assinatura_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      assistentes: {
        Row: {
          advogado_id: string
          criado_em: string | null
          id: string
          user_id: string
        }
        Insert: {
          advogado_id: string
          criado_em?: string | null
          id?: string
          user_id: string
        }
        Update: {
          advogado_id?: string
          criado_em?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assistentes_advogado_id_fkey"
            columns: ["advogado_id"]
            isOneToOne: false
            referencedRelation: "advogados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assistentes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_assistente_advogado"
            columns: ["advogado_id"]
            isOneToOne: false
            referencedRelation: "advogados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_assistente_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      casos: {
        Row: {
          advogado_id: string | null
          cliente_id: string | null
          criado_em: string | null
          descricao: string | null
          id: string
          status: string | null
          titulo: string
        }
        Insert: {
          advogado_id?: string | null
          cliente_id?: string | null
          criado_em?: string | null
          descricao?: string | null
          id?: string
          status?: string | null
          titulo: string
        }
        Update: {
          advogado_id?: string | null
          cliente_id?: string | null
          criado_em?: string | null
          descricao?: string | null
          id?: string
          status?: string | null
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "casos_advogado_id_fkey"
            columns: ["advogado_id"]
            isOneToOne: false
            referencedRelation: "advogados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "casos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_caso_advogado"
            columns: ["advogado_id"]
            isOneToOne: false
            referencedRelation: "advogados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_caso_cliente"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      clientes: {
        Row: {
          advogado_id: string | null
          criado_em: string | null
          id: string
          user_id: string
        }
        Insert: {
          advogado_id?: string | null
          criado_em?: string | null
          id?: string
          user_id: string
        }
        Update: {
          advogado_id?: string | null
          criado_em?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "clientes_advogado_id_fkey"
            columns: ["advogado_id"]
            isOneToOne: false
            referencedRelation: "advogados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clientes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_cliente_advogado"
            columns: ["advogado_id"]
            isOneToOne: false
            referencedRelation: "advogados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_cliente_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      documentos: {
        Row: {
          caso_id: string
          criado_em: string | null
          id: string
          nome: string
          url: string
        }
        Insert: {
          caso_id: string
          criado_em?: string | null
          id?: string
          nome: string
          url: string
        }
        Update: {
          caso_id?: string
          criado_em?: string | null
          id?: string
          nome?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "documentos_caso_id_fkey"
            columns: ["caso_id"]
            isOneToOne: false
            referencedRelation: "casos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_documento_caso"
            columns: ["caso_id"]
            isOneToOne: false
            referencedRelation: "casos"
            referencedColumns: ["id"]
          },
        ]
      }
      escritorios: {
        Row: {
          criado_em: string | null
          endereco: string | null
          id: string
          nome: string
          telefone: string | null
        }
        Insert: {
          criado_em?: string | null
          endereco?: string | null
          id?: string
          nome: string
          telefone?: string | null
        }
        Update: {
          criado_em?: string | null
          endereco?: string | null
          id?: string
          nome?: string
          telefone?: string | null
        }
        Relationships: []
      }
      notes: {
        Row: {
          id: number
          title: string
        }
        Insert: {
          id?: never
          title: string
        }
        Update: {
          id?: never
          title?: string
        }
        Relationships: []
      }
      permissoes: {
        Row: {
          criado_em: string | null
          id: string
          tipo: string
          user_id: string | null
        }
        Insert: {
          criado_em?: string | null
          id?: string
          tipo: string
          user_id?: string | null
        }
        Update: {
          criado_em?: string | null
          id?: string
          tipo?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_permissoes_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      planos: {
        Row: {
          criado_em: string | null
          descricao: string | null
          id: string
          nome: string
          preco: number
        }
        Insert: {
          criado_em?: string | null
          descricao?: string | null
          id?: string
          nome: string
          preco: number
        }
        Update: {
          criado_em?: string | null
          descricao?: string | null
          id?: string
          nome?: string
          preco?: number
        }
        Relationships: []
      }
      users: {
        Row: {
          criado_em: string | null
          email: string
          id: string
          nome: string
          password: string
          tipo: string
        }
        Insert: {
          criado_em?: string | null
          email: string
          id?: string
          nome: string
          password: string
          tipo: string
        }
        Update: {
          criado_em?: string | null
          email?: string
          id?: string
          nome?: string
          password?: string
          tipo?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_escritorio_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database["public"];  // Ensure this is properly defined

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof (PublicSchema["Enums"] & {})
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
