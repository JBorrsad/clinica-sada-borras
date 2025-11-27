// Información de contacto
export const CONTACT_INFO = {
	pamplona: {
		name: 'Pamplona',
		address: 'Avenida Pío XII, 8, bajo',
		postalCode: '31008',
		city: 'Pamplona',
		phone: '948 172 617',
		mobile: '683 438 077',
		email: 'admin@clinicaborras.es'
	},
	tafalla: {
		name: 'Tafalla',
		address: 'Diputación Foral, 2 - 2º C y D',
		postalCode: '31300',
		city: 'Tafalla',
		phone: '948 702 057',
		email: 'tafalla@clinicasadaborras.com'
	}
} as const;

// Servicios ofrecidos
export const SERVICES = [
	{
		id: 'implantologia',
		title: 'Implantología',
		icon: 'tesicon11.png',
		image: '/img/servicios_cards/implante.jpg',
		features: ['Implantes de titanio biocompatibles', 'Regeneración ósea guiada', 'Carga inmediata en casos seleccionados']
	},
	{
		id: 'cirugia-oral',
		title: 'Cirugía Oral',
		icon: 'tesicon11.png',
		image: '/img/servicios_cards/cirugiaoral.png',
		features: ['Extracciones y muelas del juicio', 'Limpiezas profundas y raspado radicular', 'Regeneración ósea guiada']
	},
	{
		id: 'odontologia-conservadora',
		title: 'Odontología Conservadora',
		icon: 'tesicon2.png',
		image: '/img/servicios_cards/conservadora.png',
		features: ['Empastes de composite estético', 'Reconstrucciones dentales', 'Incrustaciones cerámicas']
	},
	{
		id: 'estetica-dental',
		title: 'Estética Dental',
		icon: 'tesicon2.png',
		image: '/img/servicios_cards/estetica.png',
		features: ['Carillas de porcelana', 'Diseño digital de sonrisa', 'Resultados naturales y duraderos']
	},
	{
		id: 'odontopediatria',
		title: 'Odontopediatría',
		icon: 'tesicon4.png',
		image: '/img/servicios_cards/qs02.jpg',
		features: ['Atención especializada para niños', 'Prevención de caries infantil', 'Ambiente adaptado y sin estrés']
	},
	{
		id: 'rmr',
		title: 'Tratamiento RMR',
		icon: 'tesicon5.png',
		image: '/img/servicios_cards/rmr2.png',
		features: ['Rehabilitación masticatoria', 'Mejora de la respiración nasal', 'Corrección de hábitos orales']
	},
	{
		id: 'estetica-facial',
		title: 'Estética Facial',
		icon: 'tesicon6.png',
		image: '/img/servicios_cards/esteticafacial.jpg',
		features: ['Rellenos con ácido hialurónico', 'Tratamiento de arrugas con toxina', 'Rejuvenecimiento natural']
	},
	{
		id: 'ortodoncia',
		title: 'Ortodoncia',
		icon: 'tesicon8.png',
		image: '/img/servicios_cards/orto.jpg',
		features: ['Alineadores invisibles', 'Brackets metálicos y estéticos', 'Ortodoncia para adultos y niños']
	},
	{
		id: 'endodoncia',
		title: 'Endodoncia',
		icon: 'tesicon2.png',
		image: '/img/servicios_cards/endo.png',
		features: ['Tratamientos de conductos', 'Salvamos dientes comprometidos', 'Técnicas con microscopio']
	},
	{
		id: 'protesis',
		title: 'Prótesis',
		icon: 'tesicon11.png',
		image: '/img/servicios_cards/protesis.png',
		features: ['Prótesis fijas sobre implantes', 'Prótesis removibles', 'Rehabilitaciones completas']
	},
	{
		id: 'prevencion-higiene',
		title: 'Prevención e Higiene',
		icon: 'tesicon4.png',
		image: '/img/servicios_cards/prevencion.png',
		features: ['Limpiezas dentales profesionales', 'Fluorización y selladores', 'Enseñanza de higiene oral']
	},
	{
		id: 'blanqueamiento',
		title: 'Blanqueamiento',
		icon: 'tesicon2.png',
		image: '/img/servicios_cards/blanqueamiento.jpg',
		features: ['Blanqueamiento LED en clínica', 'Tratamiento ambulatorio en casa', 'Resultados visibles desde primera sesión']
	}
] as const;

// Navegación
export const NAV_ITEMS = [
	{ label: 'Inicio', href: '#inicio' },
	{ label: 'Servicios', href: '#servicios' },
	{ label: 'Equipo', href: '#equipo' },
	{ label: 'Clínicas', href: '#clinicas' }
] as const;

