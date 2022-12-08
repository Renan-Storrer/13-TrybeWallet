import React from 'react';

class Wallet extends React.Component {
  render() {
    return <div>TrybeWallet</div>;
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Wallet);
