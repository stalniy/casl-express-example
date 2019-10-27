const { AbilityBuilder, Ability } = require('@casl/ability');

function defineAbilitiesFor(user) {
  const { rules, can } = AbilityBuilder.extract();

  can('read', ['Post', 'Comment']);
  can('create', 'User');

  if (user) {
    can(['create', 'delete', 'update'], ['Post', 'Comment'], { author: user._id });
    can(['read', 'update'], 'User', { _id: user.id });
  }

  return new Ability(rules);
}

const ANONYMOUS_ABILITY = defineAbilitiesFor(null);

module.exports = function createAbilities(req, res, next) {
  req.ability = req.user.email ? defineAbilitiesFor(req.user) : ANONYMOUS_ABILITY;
  next();
};
