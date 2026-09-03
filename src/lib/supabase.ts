import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Profile, Campaign, Sale } from '../types';

// Storage keys
const SUPABASE_CONFIG_KEY = 'salesflow_supabase_config';
const LOCAL_PROFILES_KEY = 'salesflow_profiles_v2';
const LOCAL_CAMPAIGNS_KEY = 'salesflow_campaigns_v1';
const LOCAL_SALES_KEY = 'salesflow_sales_v1';
const LOCAL_CURRENT_USER_KEY = 'salesflow_current_user_v2';

// Initial seed data
export const INITIAL_PROFILES: Profile[] = [
  {
    id: 'usr-estacio-daniel',
    name: 'daniel.marques',
    email: 'daniel.marques@estacio.br',
    role: 'admin',
    avatar_url: '',
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    phone: '(21) 98765-4321',
    target_monthly: 0,
  },
  {
    id: 'usr-estacio-guilherme',
    name: 'guilherme.dsribeiro',
    email: 'guilherme.dsribeiro@estacio.br',
    role: 'seller',
    avatar_url: '',
    created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    phone: '(21) 99123-8877',
    target_monthly: 5,
  },
  {
    id: 'usr-estacio-kathlen',
    name: 'kathlen.paulino',
    email: 'kathlen.paulino@estacio.br',
    role: 'seller',
    avatar_url: '',
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    phone: '(21) 98456-1122',
    target_monthly: 5,
  },
  {
    id: 'usr-estacio-marcello',
    name: 'marcello.oliveira',
    email: 'marcello.oliveira@estacio.br',
    role: 'seller',
    avatar_url: '',
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    phone: '(21) 97654-3344',
    target_monthly: 5,
  },
  {
    id: 'usr-estacio-lucas',
    name: 'lucas.ferreira',
    email: 'lucas.ferreira@estacio.br',
    role: 'seller',
    avatar_url: '',
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    phone: '(21) 99345-6677',
    target_monthly: 5,
  },
  {
    id: 'usr-estacio-beatriz',
    name: 'beatriz.costa',
    email: 'beatriz.costa@estacio.br',
    role: 'seller',
    avatar_url: '',
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    phone: '(21) 99887-1122',
    target_monthly: 5,
  },
  {
    id: 'usr-estacio-mariana',
    name: 'mariana.silva',
    email: 'mariana.silva@estacio.br',
    role: 'seller',
    avatar_url: '',
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    phone: '(21) 97744-5566',
    target_monthly: 5,
  },
  {
    id: 'usr-estacio-bruno',
    name: 'bruno.santos',
    email: 'bruno.santos@estacio.br',
    role: 'seller',
    avatar_url: '',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    phone: '(21) 98855-4433',
    target_monthly: 5,
  },
  {
    id: 'usr-estacio-camila',
    name: 'camila.rodrigues',
    email: 'camila.rodrigues@estacio.br',
    role: 'seller',
    avatar_url: '',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    phone: '(21) 99933-2211',
    target_monthly: 5,
  }
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-q1-2026',
    title: 'Campanha Acelera Vendas Q1',
    description: 'Campanha de expansão comercial com bônus de 5% sobre faturamento de soluções corporativas.',
    code: 'ACELERA-Q1',
    active: true,
    commission_rate: 5.0,
    target_amount: 250000,
    start_date: '2026-01-01',
    end_date: '2026-03-31',
    created_by: 'usr-admin-01',
    created_at: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    fields: [
      {
        id: 'f_client_cnpj',
        label: 'CNPJ / CPF da Empresa',
        type: 'text',
        required: true,
        placeholder: '00.000.000/0001-00',
      },
      {
        id: 'f_plan_type',
        label: 'Plano / Solução Contratada',
        type: 'select',
        required: true,
        options: ['Plano Enterprise Anual', 'Plano Growth Semestral', 'Consultoria e Implantação', 'Licenciamento SaaS Cloud'],
      },
      {
        id: 'f_installments',
        label: 'Número de Parcelas',
        type: 'select',
        required: false,
        options: ['À Vista', '2x', '3x', '6x', '12x'],
      }
    ]
  },
  {
    id: 'camp-saas-enterprise',
    title: 'Campanha Novos Clientes Cloud & IA',
    description: 'Foco em aquisição de novas contas para a plataforma de Inteligência e Automação de Processos.',
    code: 'CLOUD-IA-2026',
    active: true,
    commission_rate: 6.5,
    target_amount: 180000,
    start_date: '2026-02-01',
    end_date: '2026-04-30',
    created_by: 'usr-admin-01',
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    fields: [
      {
        id: 'f_tech_lead',
        label: 'Canal de Origem do Lead',
        type: 'select',
        required: true,
        options: ['Inbound / Site', 'Outbound / Prospecção', 'Indicação / Parceiro', 'Evento Presencial'],
      },
      {
        id: 'f_contract_duration',
        label: 'Duração do Contrato',
        type: 'select',
        required: true,
        options: ['12 Meses', '24 Meses (Fidelidade)', '36 Meses (Enterprise VIP)'],
      }
    ]
  }
];

export const INITIAL_SALES: Sale[] = [
  {
    id: 'sale-spr-001',
    campaign_id: 'camp-q1-2026',
    campaign_name: 'Campanha Acelera Vendas Q1',
    seller_id: 'usr-seller-bruna',
    seller_name: 'Bruna',
    seller_email: 'bruna@r9corp.com.br',
    client_name: 'ANTHONY LINCON VAL',
    client_phone: '(11) 98711-2233',
    client_email: 'anthony.val@gmail.com',
    product_name: 'Graduação - Presencial (Manhã)',
    value: 1250,
    payment_method: 'PIX',
    status: 'Aprovada',
    commission: 62.5,
    notes: 'Aluno Fies',
    created_at: new Date('2026-09-01T09:15:00Z').toISOString(),
    custom_data: {
      opportunity_number: '955434274',
      candidate_name: 'ANTHONY LINCON VAL',
      sale_date: '01/09/2026',
      main_product: 'Graduação',
      business_unit: 'BU Presencial',
      fdi_channel: 'Transferência Externa',
      modality: 'Presencial',
      shift: 'Manhã',
      parcela_leve: 'Sem parcelas',
      has_bolsa_convenio: false,
      empresa_convenio: ''
    }
  },
  {
    id: 'sale-spr-002',
    campaign_id: 'camp-q1-2026',
    campaign_name: 'Campanha Acelera Vendas Q1',
    seller_id: 'usr-seller-luiza',
    seller_name: 'Luiza',
    seller_email: 'luiza@r9corp.com.br',
    client_name: 'Bruna Silva Luciano',
    client_phone: '(11) 99122-3344',
    client_email: 'bruna.luciano@outlook.com',
    product_name: 'Graduação - Semipresencial (Noite)',
    value: 950,
    payment_method: 'PIX',
    status: 'Aprovada',
    commission: 47.5,
    notes: '',
    created_at: new Date('2026-09-01T09:30:00Z').toISOString(),
    custom_data: {
      opportunity_number: '955551577',
      candidate_name: 'Bruna Silva Luciano',
      sale_date: '01/09/2026',
      main_product: 'Graduação',
      business_unit: 'BU Presencial',
      fdi_channel: 'Simplificada',
      modality: 'Semipresencial',
      shift: 'Noite',
      parcela_leve: '3 parcelas',
      has_bolsa_convenio: false,
      empresa_convenio: ''
    }
  },
  {
    id: 'sale-spr-003',
    campaign_id: 'camp-q1-2026',
    campaign_name: 'Campanha Acelera Vendas Q1',
    seller_id: 'usr-seller-caique',
    seller_name: 'Caíque',
    seller_email: 'caique@r9corp.com.br',
    client_name: 'ana carolina ferreira de',
    client_phone: '(21) 98877-6655',
    client_email: 'ana.ferreira@gmail.com',
    product_name: 'Graduação - Semipresencial (Noite)',
    value: 950,
    payment_method: 'PIX',
    status: 'Aprovada',
    commission: 47.5,
    notes: '',
    created_at: new Date('2026-09-01T10:00:00Z').toISOString(),
    custom_data: {
      opportunity_number: '955551818',
      candidate_name: 'ana carolina ferreira de',
      sale_date: '01/09/2026',
      main_product: 'Graduação',
      business_unit: 'BU Presencial',
      fdi_channel: 'Simplificada',
      modality: 'Semipresencial',
      shift: 'Noite',
      parcela_leve: '3 parcelas',
      has_bolsa_convenio: false,
      empresa_convenio: ''
    }
  },
  {
    id: 'sale-spr-004',
    campaign_id: 'camp-q1-2026',
    campaign_name: 'Campanha Acelera Vendas Q1',
    seller_id: 'usr-seller-giovanna',
    seller_name: 'Giovanna',
    seller_email: 'giovanna@r9corp.com.br',
    client_name: 'ruth germano de lucen',
    client_phone: '(41) 99844-3322',
    client_email: 'ruth.germano@gmail.com',
    product_name: 'Graduação - EAD (Virtual)',
    value: 650,
    payment_method: 'PIX',
    status: 'Aprovada',
    commission: 32.5,
    notes: '',
    created_at: new Date('2026-09-01T10:20:00Z').toISOString(),
    custom_data: {
      opportunity_number: '955552012',
      candidate_name: 'ruth germano de lucen',
      sale_date: '01/09/2026',
      main_product: 'Graduação',
      business_unit: 'BU Digital',
      fdi_channel: 'Simplificada',
      modality: 'EAD',
      shift: 'Virtual',
      parcela_leve: '3 parcelas',
      has_bolsa_convenio: false,
      empresa_convenio: ''
    }
  },
  {
    id: 'sale-spr-005',
    campaign_id: 'camp-q1-2026',
    campaign_name: 'Campanha Acelera Vendas Q1',
    seller_id: 'usr-seller-giovanna',
    seller_name: 'Giovanna',
    seller_email: 'giovanna@r9corp.com.br',
    client_name: 'JUDITH da costa lopes',
    client_phone: '(11) 97755-4433',
    client_email: 'judith.costa@uol.com.br',
    product_name: 'Pós Graduação - Ao Vivo (Noite)',
    value: 1600,
    payment_method: 'PIX',
    status: 'Aprovada',
    commission: 80.0,
    notes: '',
    created_at: new Date('2026-09-01T10:45:00Z').toISOString(),
    custom_data: {
      opportunity_number: '955552009',
      candidate_name: 'JUDITH da costa lopes',
      sale_date: '01/09/2026',
      main_product: 'Pós Graduação',
      business_unit: 'BU Presencial',
      fdi_channel: 'Pós Graduação',
      modality: 'Ao Vivo',
      shift: 'Noite',
      parcela_leve: 'Sem parcelas',
      has_bolsa_convenio: false,
      empresa_convenio: ''
    }
  },
  {
    id: 'sale-spr-006',
    campaign_id: 'camp-q1-2026',
    campaign_name: 'Campanha Acelera Vendas Q1',
    seller_id: 'usr-seller-bruna',
    seller_name: 'Bruna',
    seller_email: 'bruna@r9corp.com.br',
    client_name: 'JADER JUAN DA SILVA L',
    client_phone: '(31) 98765-4321',
    client_email: 'jader.silva@gmail.com',
    product_name: 'Graduação - Semipresencial (Noite)',
    value: 950,
    payment_method: 'PIX',
    status: 'Aprovada',
    commission: 47.5,
    notes: '',
    created_at: new Date('2026-09-01T11:00:00Z').toISOString(),
    custom_data: {
      opportunity_number: '955552481',
      candidate_name: 'JADER JUAN DA SILVA L',
      sale_date: '01/09/2026',
      main_product: 'Graduação',
      business_unit: 'BU Presencial',
      fdi_channel: 'Simplificada',
      modality: 'Semipresencial',
      shift: 'Noite',
      parcela_leve: '3 parcelas',
      has_bolsa_convenio: false,
      empresa_convenio: ''
    }
  },
  {
    id: 'sale-spr-007',
    campaign_id: 'camp-q1-2026',
    campaign_name: 'Campanha Acelera Vendas Q1',
    seller_id: 'usr-seller-bruna',
    seller_name: 'Bruna',
    seller_email: 'bruna@r9corp.com.br',
    client_name: 'Erica CRISTINA PINHEIR',
    client_phone: '(11) 99344-8899',
    client_email: 'erica.pinheiro@gmail.com',
    product_name: 'Pós Graduação - Pós Presencial (Virtual)',
    value: 1850,
    payment_method: 'PIX',
    status: 'Aprovada',
    commission: 92.5,
    notes: '',
    created_at: new Date('2026-09-01T11:30:00Z').toISOString(),
    custom_data: {
      opportunity_number: '955552929',
      candidate_name: 'Erica CRISTINA PINHEIR',
      sale_date: '01/09/2026',
      main_product: 'Pós Graduação',
      business_unit: 'BU Presencial',
      fdi_channel: 'Pós Graduação',
      modality: 'Pós Presencial',
      shift: 'Virtual',
      parcela_leve: 'Sem parcelas',
      has_bolsa_convenio: false,
      empresa_convenio: ''
    }
  },
  {
    id: 'sale-spr-008',
    campaign_id: 'camp-q1-2026',
    campaign_name: 'Campanha Acelera Vendas Q1',
    seller_id: 'usr-seller-giovanna',
    seller_name: 'Giovanna',
    seller_email: 'giovanna@r9corp.com.br',
    client_name: 'Patricia de Araújo Quar',
    client_phone: '(21) 98111-3322',
    client_email: 'patricia.araujo@dimagem.com.br',
    product_name: 'Graduação - Ao Vivo (Noite)',
    value: 1100,
    payment_method: 'PIX',
    status: 'Aprovada',
    commission: 55.0,
    notes: '',
    created_at: new Date('2026-09-01T11:45:00Z').toISOString(),
    custom_data: {
      opportunity_number: '955553042',
      candidate_name: 'Patricia de Araújo Quar',
      sale_date: '01/09/2026',
      main_product: 'Graduação',
      business_unit: 'BU Presencial',
      fdi_channel: 'Simplificada',
      modality: 'Ao Vivo',
      shift: 'Noite',
      parcela_leve: '3 parcelas',
      has_bolsa_convenio: true,
      empresa_convenio: 'DIMAGEM DIAGNOSTIK'
    }
  },
  {
    id: 'sale-spr-009',
    campaign_id: 'camp-q1-2026',
    campaign_name: 'Campanha Acelera Vendas Q1',
    seller_id: 'usr-seller-giovanna',
    seller_name: 'Giovanna',
    seller_email: 'giovanna@r9corp.com.br',
    client_name: 'Jessica SIQUEIRA SILVA',
    client_phone: '(41) 98455-6677',
    client_email: 'jessica.siqueira@gmail.com',
    product_name: 'Graduação - EAD (Virtual)',
    value: 650,
    payment_method: 'PIX',
    status: 'Aprovada',
    commission: 32.5,
    notes: '',
    created_at: new Date('2026-09-01T12:00:00Z').toISOString(),
    custom_data: {
      opportunity_number: '955553498',
      candidate_name: 'Jessica SIQUEIRA SILVA',
      sale_date: '01/09/2026',
      main_product: 'Graduação',
      business_unit: 'BU Digital',
      fdi_channel: 'Simplificada',
      modality: 'EAD',
      shift: 'Virtual',
      parcela_leve: '3 parcelas',
      has_bolsa_convenio: false,
      empresa_convenio: ''
    }
  },
  {
    id: 'sale-spr-010',
    campaign_id: 'camp-q1-2026',
    campaign_name: 'Campanha Acelera Vendas Q1',
    seller_id: 'usr-seller-luiza',
    seller_name: 'Luiza',
    seller_email: 'luiza@r9corp.com.br',
    client_name: 'Marcus Vinicius Ramos',
    client_phone: '(11) 97123-4567',
    client_email: 'marcus.ramos@hotmail.com',
    product_name: 'Graduação - Semipresencial (Noite)',
    value: 950,
    payment_method: 'PIX',
    status: 'Aprovada',
    commission: 47.5,
    notes: '',
    created_at: new Date('2026-09-01T12:30:00Z').toISOString(),
    custom_data: {
      opportunity_number: '955552480',
      candidate_name: 'Marcus Vinicius Ramos',
      sale_date: '01/09/2026',
      main_product: 'Graduação',
      business_unit: 'BU Presencial',
      fdi_channel: 'Simplificada',
      modality: 'Semipresencial',
      shift: 'Noite',
      parcela_leve: 'Sem parcelas',
      has_bolsa_convenio: false,
      empresa_convenio: ''
    }
  },
  {
    id: 'sale-spr-011',
    campaign_id: 'camp-q1-2026',
    campaign_name: 'Campanha Acelera Vendas Q1',
    seller_id: 'usr-seller-guilherme',
    seller_name: 'Guilherme',
    seller_email: 'guilherme@r9corp.com.br',
    client_name: 'Angela Aparecida Reis',
    client_phone: '(11) 98844-2211',
    client_email: 'angela.reis@gmail.com',
    product_name: 'Graduação - Presencial (Noite)',
    value: 1250,
    payment_method: 'PIX',
    status: 'Aprovada',
    commission: 62.5,
    notes: 'transposição',
    created_at: new Date('2026-09-01T13:00:00Z').toISOString(),
    custom_data: {
      opportunity_number: '955551960',
      candidate_name: 'Angela Aparecida Reis',
      sale_date: '01/09/2026',
      main_product: 'Graduação',
      business_unit: 'BU Presencial',
      fdi_channel: 'Simplificada',
      modality: 'Presencial',
      shift: 'Noite',
      parcela_leve: 'Sem parcelas',
      has_bolsa_convenio: false,
      empresa_convenio: ''
    }
  },
  {
    id: 'sale-spr-012',
    campaign_id: 'camp-q1-2026',
    campaign_name: 'Campanha Acelera Vendas Q1',
    seller_id: 'usr-seller-giovanna',
    seller_name: 'Giovanna',
    seller_email: 'giovanna@r9corp.com.br',
    client_name: 'Juliana Moreira de Sant',
    client_phone: '(11) 98711-9988',
    client_email: 'juliana.santos@gmail.com',
    product_name: 'Graduação - Semipresencial (Noite)',
    value: 950,
    payment_method: 'PIX',
    status: 'Aprovada',
    commission: 47.5,
    notes: '',
    created_at: new Date('2026-09-01T13:30:00Z').toISOString(),
    custom_data: {
      opportunity_number: '955536099',
      candidate_name: 'Juliana Moreira de Sant',
      sale_date: '01/09/2026',
      main_product: 'Graduação',
      business_unit: 'BU Presencial',
      fdi_channel: 'Simplificada',
      modality: 'Semipresencial',
      shift: 'Noite',
      parcela_leve: '3 parcelas',
      has_bolsa_convenio: false,
      empresa_convenio: ''
    }
  },
  {
    id: 'sale-spr-013',
    campaign_id: 'camp-q1-2026',
    campaign_name: 'Campanha Acelera Vendas Q1',
    seller_id: 'usr-seller-caique',
    seller_name: 'Caíque',
    seller_email: 'caique@r9corp.com.br',
    client_name: 'Rannan Villela Abreu',
    client_phone: '(21) 99822-1144',
    client_email: 'rannan.abreu@gmail.com',
    product_name: 'Graduação - Semipresencial (Manhã)',
    value: 950,
    payment_method: 'PIX',
    status: 'Aprovada',
    commission: 47.5,
    notes: '',
    created_at: new Date('2026-09-01T14:00:00Z').toISOString(),
    custom_data: {
      opportunity_number: '955553742',
      candidate_name: 'Rannan Villela Abreu',
      sale_date: '01/09/2026',
      main_product: 'Graduação',
      business_unit: 'BU Presencial',
      fdi_channel: 'Simplificada',
      modality: 'Semipresencial',
      shift: 'Manhã',
      parcela_leve: '1 parcela',
      has_bolsa_convenio: false,
      empresa_convenio: ''
    }
  },
  {
    id: 'sale-spr-014',
    campaign_id: 'camp-q1-2026',
    campaign_name: 'Campanha Acelera Vendas Q1',
    seller_id: 'usr-seller-bruna',
    seller_name: 'Bruna',
    seller_email: 'bruna@r9corp.com.br',
    client_name: 'Pablo Nogueira de Carv',
    client_phone: '(11) 99344-2211',
    client_email: 'pablo.carvalho@gmail.com',
    product_name: 'Graduação - Semipresencial (Noite)',
    value: 950,
    payment_method: 'PIX',
    status: 'Aprovada',
    commission: 47.5,
    notes: '',
    created_at: new Date('2026-09-01T14:30:00Z').toISOString(),
    custom_data: {
      opportunity_number: '955552252',
      candidate_name: 'Pablo Nogueira de Carv',
      sale_date: '01/09/2026',
      main_product: 'Graduação',
      business_unit: 'BU Presencial',
      fdi_channel: 'Simplificada',
      modality: 'Semipresencial',
      shift: 'Noite',
      parcela_leve: 'Sem parcelas',
      has_bolsa_convenio: false,
      empresa_convenio: ''
    }
  },
  {
    id: 'sale-spr-015',
    campaign_id: 'camp-q1-2026',
    campaign_name: 'Campanha Acelera Vendas Q1',
    seller_id: 'usr-seller-maria',
    seller_name: 'Maria',
    seller_email: 'maria@r9corp.com.br',
    client_name: 'Erick Fernando Alves Ca',
    client_phone: '(31) 98765-1100',
    client_email: 'erick.alves@gmail.com',
    product_name: 'Graduação - Semipresencial (Noite)',
    value: 950,
    payment_method: 'PIX',
    status: 'Aprovada',
    commission: 47.5,
    notes: '',
    created_at: new Date('2026-09-01T15:00:00Z').toISOString(),
    custom_data: {
      opportunity_number: '955544590',
      candidate_name: 'Erick Fernando Alves Ca',
      sale_date: '01/09/2026',
      main_product: 'Graduação',
      business_unit: 'BU Presencial',
      fdi_channel: 'Simplificada',
      modality: 'Semipresencial',
      shift: 'Noite',
      parcela_leve: '3 parcelas',
      has_bolsa_convenio: false,
      empresa_convenio: ''
    }
  },
  {
    id: 'sale-spr-016',
    campaign_id: 'camp-q1-2026',
    campaign_name: 'Campanha Acelera Vendas Q1',
    seller_id: 'usr-seller-bruna',
    seller_name: 'Bruna',
    seller_email: 'bruna@r9corp.com.br',
    client_name: 'Maria Gabriela Souza d',
    client_phone: '(11) 98111-4455',
    client_email: 'maria.souza@gmail.com',
    product_name: 'Pós Graduação - Pós Presencial (Noite)',
    value: 1850,
    payment_method: 'PIX',
    status: 'Aprovada',
    commission: 92.5,
    notes: '',
    created_at: new Date('2026-09-01T15:30:00Z').toISOString(),
    custom_data: {
      opportunity_number: '955502031',
      candidate_name: 'Maria Gabriela Souza d',
      sale_date: '01/09/2026',
      main_product: 'Pós Graduação',
      business_unit: 'BU Presencial',
      fdi_channel: 'Pós Graduação',
      modality: 'Pós Presencial',
      shift: 'Noite',
      parcela_leve: 'Sem parcelas',
      has_bolsa_convenio: false,
      empresa_convenio: ''
    }
  },
  {
    id: 'sale-spr-017',
    campaign_id: 'camp-q1-2026',
    campaign_name: 'Campanha Acelera Vendas Q1',
    seller_id: 'usr-seller-luiza',
    seller_name: 'Luiza',
    seller_email: 'luiza@r9corp.com.br',
    client_name: 'Brenno Marcos de Oliv',
    client_phone: '(21) 98777-3322',
    client_email: 'brenno.oliveira@colegio.com.br',
    product_name: 'Graduação - Presencial (Manhã)',
    value: 1250,
    payment_method: 'PIX',
    status: 'Aprovada',
    commission: 62.5,
    notes: '',
    created_at: new Date('2026-09-01T16:00:00Z').toISOString(),
    custom_data: {
      opportunity_number: '955530409',
      candidate_name: 'Brenno Marcos de Oliv',
      sale_date: '01/09/2026',
      main_product: 'Graduação',
      business_unit: 'BU Presencial',
      fdi_channel: 'Transferência Externa',
      modality: 'Presencial',
      shift: 'Manhã',
      parcela_leve: 'Sem parcelas',
      has_bolsa_convenio: true,
      empresa_convenio: 'Colegio'
    }
  },
  {
    id: 'sale-spr-018',
    campaign_id: 'camp-q1-2026',
    campaign_name: 'Campanha Acelera Vendas Q1',
    seller_id: 'usr-seller-giovanna',
    seller_name: 'Giovanna',
    seller_email: 'giovanna@r9corp.com.br',
    client_name: 'Hugo Neves Carvalho',
    client_phone: '(41) 99888-7766',
    client_email: 'hugo.neves@gmail.com',
    product_name: 'Graduação - Ao Vivo (Noite)',
    value: 1100,
    payment_method: 'PIX',
    status: 'Aprovada',
    commission: 55.0,
    notes: '',
    created_at: new Date('2026-09-02T09:00:00Z').toISOString(),
    custom_data: {
      opportunity_number: '955556002',
      candidate_name: 'Hugo Neves Carvalho',
      sale_date: '02/09/2026',
      main_product: 'Graduação',
      business_unit: 'BU Presencial',
      fdi_channel: 'Simplificada',
      modality: 'Ao Vivo',
      shift: 'Noite',
      parcela_leve: 'Sem parcelas',
      has_bolsa_convenio: false,
      empresa_convenio: ''
    }
  },
  {
    id: 'sale-spr-019',
    campaign_id: 'camp-q1-2026',
    campaign_name: 'Campanha Acelera Vendas Q1',
    seller_id: 'usr-seller-giovanna',
    seller_name: 'Giovanna',
    seller_email: 'giovanna@r9corp.com.br',
    client_name: 'Giovanna Moraes da Co',
    client_phone: '(11) 98444-5566',
    client_email: 'giovanna.moraes@gmail.com',
    product_name: 'Graduação - Semipresencial (Manhã)',
    value: 950,
    payment_method: 'PIX',
    status: 'Aprovada',
    commission: 47.5,
    notes: '',
    created_at: new Date('2026-09-02T09:30:00Z').toISOString(),
    custom_data: {
      opportunity_number: '954875963',
      candidate_name: 'Giovanna Moraes da Co',
      sale_date: '02/09/2026',
      main_product: 'Graduação',
      business_unit: 'BU Presencial',
      fdi_channel: 'Simplificada',
      modality: 'Semipresencial',
      shift: 'Manhã',
      parcela_leve: '3 parcelas',
      has_bolsa_convenio: false,
      empresa_convenio: ''
    }
  },
  {
    id: 'sale-spr-020',
    campaign_id: 'camp-q1-2026',
    campaign_name: 'Campanha Acelera Vendas Q1',
    seller_id: 'usr-seller-luiza',
    seller_name: 'Luiza',
    seller_email: 'luiza@r9corp.com.br',
    client_name: 'Mario lucio do nascime',
    client_phone: '(21) 97788-9900',
    client_email: 'mario.nascimento@gmail.com',
    product_name: 'Graduação - EAD (Virtual)',
    value: 650,
    payment_method: 'PIX',
    status: 'Aprovada',
    commission: 32.5,
    notes: '',
    created_at: new Date('2026-09-02T10:00:00Z').toISOString(),
    custom_data: {
      opportunity_number: '955556525',
      candidate_name: 'Mario lucio do nascime',
      sale_date: '02/09/2026',
      main_product: 'Graduação',
      business_unit: 'BU Digital',
      fdi_channel: 'Simplificada',
      modality: 'EAD',
      shift: 'Virtual',
      parcela_leve: 'Sem parcelas',
      has_bolsa_convenio: false,
      empresa_convenio: ''
    }
  }
];

// Supabase SQL Setup Script for user convenience
export const SUPABASE_SQL_SCHEMA = `-- ============================================================
-- SCHEMA OFICIAL SUPABASE PARA R9 SALES (GESTÃO DE VENDAS)
-- Execute este script no SQL Editor do seu Dashboard Supabase:
-- https://supabase.com/dashboard/project/_/sql
-- ============================================================

-- 1. Habilitar extensões
create extension if not exists "uuid-ossp";

-- 2. Tabela de Perfis de Usuários (Profiles)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  email text not null,
  role text not null check (role in ('admin', 'seller')),
  avatar_url text,
  phone text,
  status text default 'active' check (status in ('active', 'inactive')),
  target_monthly numeric default 50000,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Tabela de Campanhas e Formulários Dinâmicos (Campaigns)
create table if not exists public.campaigns (
  id text primary key default ('camp-' || substr(md5(random()::text), 1, 10)),
  title text not null,
  description text,
  code text unique not null,
  active boolean default true,
  commission_rate numeric default 5.0,
  target_amount numeric default 100000,
  start_date date not null,
  end_date date not null,
  fields jsonb default '[]'::jsonb,
  created_by uuid references public.profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Tabela de Vendas e Lançamentos (Sales)
create table if not exists public.sales (
  id text primary key default ('sale-' || substr(md5(random()::text), 1, 10)),
  campaign_id text references public.campaigns(id) on delete set null,
  campaign_name text,
  seller_id uuid references public.profiles(id) on delete cascade not null,
  seller_name text not null,
  seller_email text not null,
  client_name text not null,
  client_document text,
  client_phone text,
  client_email text,
  product_name text not null,
  value numeric not null check (value > 0),
  payment_method text not null,
  status text default 'Aprovada' check (status in ('Aprovada', 'Pendente', 'Em Análise')),
  commission numeric default 0,
  custom_data jsonb default '{}'::jsonb,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Habilitar Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.campaigns enable row level security;
alter table public.sales enable row level security;

-- Políticas para Profiles
create policy "Perfis são visíveis por todos os autenticados" 
  on public.profiles for select 
  using (auth.role() = 'authenticated');

create policy "Usuários podem atualizar seus próprios perfis ou admins podem atualizar qualquer perfil" 
  on public.profiles for update 
  using (
    auth.uid() = id or 
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins ou registro público podem inserir perfis" 
  on public.profiles for insert 
  with check (true);

-- Políticas para Campaigns
create policy "Campanhas visíveis por todos os autenticados" 
  on public.campaigns for select 
  using (auth.role() = 'authenticated');

create policy "Admins podem criar, editar ou excluir campanhas" 
  on public.campaigns for all 
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Políticas para Sales
create policy "Vendedores podem ver suas vendas e Admins podem ver todas" 
  on public.sales for select 
  using (
    auth.uid() = seller_id or 
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Vendedores e Admins podem lançar vendas" 
  on public.sales for insert 
  with check (auth.role() = 'authenticated');

create policy "Admins ou o próprio vendedor podem atualizar vendas" 
  on public.sales for update 
  using (
    auth.uid() = seller_id or 
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- 6. Trigger automático para criar perfil ao criar usuário via Supabase Auth
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, name, email, role, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'seller'),
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Habilitar Realtime
alter publication supabase_realtime add table public.profiles;
alter publication supabase_realtime add table public.campaigns;
alter publication supabase_realtime add table public.sales;
`;

// Helper to get Supabase client
export function getSupabaseClient(): SupabaseClient | null {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  let savedConfig: { url: string; anonKey: string } | null = null;
  try {
    const raw = localStorage.getItem(SUPABASE_CONFIG_KEY);
    if (raw) savedConfig = JSON.parse(raw);
  } catch (e) {
    console.error('Error parsing stored supabase config', e);
  }

  const url = savedConfig?.url || envUrl;
  const key = savedConfig?.anonKey || envKey;

  if (url && key && url !== 'https://your-project.supabase.co' && key !== 'your-anon-key') {
    try {
      return createClient(url, key);
    } catch (err) {
      console.warn('Could not initialize Supabase client:', err);
    }
  }
  return null;
}

// Local Storage Sync Engine for seamless, 100% resilient operation
export class LocalSyncEngine {
  static getProfiles(): Profile[] {
    try {
      const stored = localStorage.getItem(LOCAL_PROFILES_KEY);
      if (stored) return JSON.parse(stored);
      localStorage.setItem(LOCAL_PROFILES_KEY, JSON.stringify(INITIAL_PROFILES));
      return INITIAL_PROFILES;
    } catch {
      return INITIAL_PROFILES;
    }
  }

  static saveProfiles(profiles: Profile[]) {
    try {
      localStorage.setItem(LOCAL_PROFILES_KEY, JSON.stringify(profiles));
    } catch (e) {
      console.error('Failed to save profiles locally', e);
    }
  }

  static getCampaigns(): Campaign[] {
    try {
      const stored = localStorage.getItem(LOCAL_CAMPAIGNS_KEY);
      if (stored) return JSON.parse(stored);
      localStorage.setItem(LOCAL_CAMPAIGNS_KEY, JSON.stringify(INITIAL_CAMPAIGNS));
      return INITIAL_CAMPAIGNS;
    } catch {
      return INITIAL_CAMPAIGNS;
    }
  }

  static saveCampaigns(campaigns: Campaign[]) {
    try {
      localStorage.setItem(LOCAL_CAMPAIGNS_KEY, JSON.stringify(campaigns));
    } catch (e) {
      console.error('Failed to save campaigns locally', e);
    }
  }

  static getSales(): Sale[] {
    try {
      const stored = localStorage.getItem(LOCAL_SALES_KEY);
      if (stored) return JSON.parse(stored);
      localStorage.setItem(LOCAL_SALES_KEY, JSON.stringify(INITIAL_SALES));
      return INITIAL_SALES;
    } catch {
      return INITIAL_SALES;
    }
  }

  static saveSales(sales: Sale[]) {
    try {
      localStorage.setItem(LOCAL_SALES_KEY, JSON.stringify(sales));
    } catch (e) {
      console.error('Failed to save sales locally', e);
    }
  }

  static getCurrentUser(): Profile | null {
    try {
      const stored = localStorage.getItem(LOCAL_CURRENT_USER_KEY);
      if (stored) return JSON.parse(stored);
      // Default to admin or seller on first load
      return INITIAL_PROFILES[0];
    } catch {
      return INITIAL_PROFILES[0];
    }
  }

  static setCurrentUser(profile: Profile | null) {
    try {
      if (profile) {
        localStorage.setItem(LOCAL_CURRENT_USER_KEY, JSON.stringify(profile));
      } else {
        localStorage.removeItem(LOCAL_CURRENT_USER_KEY);
      }
    } catch (e) {
      console.error('Failed to save current user', e);
    }
  }
}
