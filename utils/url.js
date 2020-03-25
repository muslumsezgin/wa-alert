const version = '/v1/';
const base = () => process.env.WA_URL + version;

const login = () => base() + 'users/login';
const messages = () => base() + 'messages/';
const groups = () => base() + 'groups/';
const groupsWithId = (id, groupsType = '') => groups() + id + groupsType;

const groupsType = {
    admins: '/admins',
    icon: '/icon',
    iconLink: '/icon?format=link',
    invite: '/invite',
    leave: '/leave',
    participants: '/participants'
};

module.exports = {
    login,
    messages,
    groups,
    groupsWithId,
};
module.exports.groupsType = groupsType;

