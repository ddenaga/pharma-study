export const patientAcl = {
	aclInput: {
		acl: [
			{
				principal: { nodes: ['FDA', 'Bavaria'] },
				path: 'dob',
				operations: ['READ'],
			},
			{
				principal: { nodes: ['FDA', 'Bavaria'] },
				path: 'height',
				operations: ['READ'],
			},
			{
				principal: { nodes: ['FDA', 'Bavaria'] },
				path: 'weight',
				operations: ['READ'],
			},
			{
				principal: { nodes: ['FDA', 'Bavaria'] },
				path: 'bloodPressure',
				operations: ['READ'],
			},
			{
				principal: { nodes: ['FDA', 'Bavaria'] },
				path: 'bloodType',
				operations: ['READ'],
			},
			{
				principal: { nodes: ['FDA', 'Bavaria'] },
				path: 'temperature',
				operations: ['READ'],
			},
			{
				principal: { nodes: ['FDA', 'Bavaria'] },
				path: 'oxygenSaturation',
				operations: ['READ'],
			},
			{
				principal: { nodes: ['FDA', 'Bavaria'] },
				path: 'allergies',
				operations: ['READ'],
			},
			{
				principal: { nodes: ['FDA', 'Bavaria'] },
				path: 'medications',
				operations: ['READ'],
			},
			{
				principal: { nodes: ['FDA', 'Bavaria'] },
				path: 'allergies',
				operations: ['READ'],
			},
			{
				principal: { nodes: ['FDA', 'Bavaria'] },
				path: 'familyHistory',
				operations: ['READ'],
			},
			{
				principal: { nodes: ['FDA', 'Bavaria'] },
				path: 'isEmployed',
				operations: ['READ'],
			},
			{
				principal: { nodes: ['FDA', 'Bavaria'] },
				path: 'isInsured',
				operations: ['READ'],
			},
			{
				principal: { nodes: ['FDA', 'Bavaria'] },
				path: 'icdHealthCodes',
				operations: ['READ'],
			},
			{
				principal: { nodes: ['FDA', 'Bavaria'] },
				path: 'visits',
				operations: ['READ'],
			},
			{
				principal: { nodes: ['FDA', 'Bavaria'] },
				path: 'isEligible',
				operations: ['READ'],
			},
			{
				principal: { nodes: ['FDA'] },
				path: 'treatmentId',
				operations: ['ALL'],
			},
		],
	},
};

export const treatmentAcl = {
	aclInput: {
		acl: [
			{
				principal: { nodes: ['FDA', 'Bavaria'] },
				path: 'isGeneric',
				operations: ['ALL'],
			},
			{
				principal: { nodes: ['FDA', 'Bavaria'] },
				path: 'numberOfDoses',
				operations: ['ALL'],
			},
			{
				principal: { nodes: ['JaneHopkins'] },
				path: 'numberOfDoses',
				operations: ['READ'],
			},
		],
	},
};

export const trackerAcl = {
	aclInput: {
		acl: [
			{
				principal: { nodes: ['FDA'] },
				path: 'treatmentId',
				operations: ['ALL'],
			},
			{
				principal: { nodes: ['FDA'] },
				path: 'patientId',
				operations: ['ALL'],
			},
		],
	},
};
