/**
 * Agent Smith Query Component
 * ============================
 *
 * Query textarea holding the current cypher query.
 */
var React = require('react'),
    controller = require('../controller.js');

// TODO: cannot bind to app state so drastically
module.exports = React.createClass({
  mixins: [controller.mixin],
  cursor: ['query'],
  handleChange: function(e) {
    this.cursor.edit(e.target.value);

    // TODO: cannot commit asynchronously here
    controller.state.commit();
  },
  handleKeyPress: function(e) {
    if (e.which !== 13)
      return;

    e.preventDefault();

    controller.emit('query', e.target.value);
  },
  render: function() {
    return (
      <textarea rows="1"
                spellCheck={false}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                value={this.cursor.get()}
                placeholder="Neo4J query ..." />
    );
  }
});