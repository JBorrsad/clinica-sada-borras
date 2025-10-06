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
		title: 'Implantología, Cirugía Oral y Periodoncia',
		icon: 'tesicon11.png',
		image: '/img/servicios_cards/implante.jpg',
		description: 'Realizamos el proceso de extracción del diente, colocación de implante y prótesis provisional en un solo día. Utilizamos plasma rico en factores de crecimiento que acelera y mejora la cicatrización.',
		features: ['Implantes en un día', 'Plasma rico en factores de crecimiento', 'Sedación consciente con óxido nitroso']
	},
	{
		id: 'odontologia-conservadora',
		title: 'Odontología Conservadora y Estética Dental',
		icon: 'tesicon2.png',
		image: '/img/servicios_cards/estetica.jpg',
		description: 'Cuidamos sus dientes para mejorar su sonrisa y su salud. Realizamos tratamientos estéticos y conservadores de última generación.',
		features: ['Empastes estéticos', 'Carillas dentales', 'Blanqueamiento dental']
	},
	{
		id: 'odontopediatria',
		title: 'Odontopediatría',
		icon: 'tesicon4.png',
		image: '/img/servicios_cards/qs02.jpg',
		description: 'Participamos en el Programa de Atención Dental Infantil (PADI) del Servicio Navarro de Salud, ofreciendo atención dental básica gratuita para niños.',
		features: ['Programa PADI', 'Selladores de fisuras', 'Tratamiento sin miedo']
	},
	{
		id: 'odontologia-biologica',
		title: 'Rehabilitación Masticatoria-Respiratoria',
		icon: 'tesicon5.png',
		image: '/img/servicios_cards/rmr.png',
		description: 'Rehabilitamos en niños y adultos las funciones vegetativas primarias: masticación, respiración, deglución y fonación.',
		features: ['Rehabilitación respiratoria', 'Mejora de la masticación', 'Tratamiento integral']
	},
	{
		id: 'estetica-facial',
		title: 'Estética Facial',
		icon: 'tesicon6.png',
		image: '/img/servicios_cards/esteticafacial.jpg',
		description: 'Rejuvenecimiento facial con productos de alta calidad mediante tratamientos con ácido hialurónico y toxina botulínica.',
		features: ['Ácido hialurónico', 'Toxina botulínica', 'Resultados naturales']
	},
	{
		id: 'ortodoncia',
		title: 'Ortodoncia',
		icon: 'tesicon8.png',
		image: '/img/servicios_cards/orto.jpg',
		description: 'Corregimos la posición de los dientes y la mordida para mejorar tanto la estética como la funcionalidad de tu sonrisa.',
		features: ['Ortodoncia invisible', 'Brackets tradicionales', 'Tratamiento personalizado']
	}
] as const;

// Navegación
export const NAV_ITEMS = [
	{ label: 'Inicio', href: '#inicio' },
	{ label: 'Servicios', href: '#servicios' },
	{ label: 'Equipo', href: '#equipo' },
	{ label: 'Clínicas', href: '#clinicas' },
	{ label: 'Contacto', href: '#contacto' }
] as const;

