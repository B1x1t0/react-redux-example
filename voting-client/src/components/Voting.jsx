/**
 * Created by inmaculada on 17/11/15.
 */
import React from 'react';

export default React.createClass({
  getPair: function() {
    return this.props.pair || [];
  },
  render: function() {
    return <div className="voting">
      {this.getPair().map(entry =>
        <div></div>
      )}
    </div>;
  }
});