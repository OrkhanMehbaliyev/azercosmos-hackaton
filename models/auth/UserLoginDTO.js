class UserLoginDTO {
  constructor(props) {
    this.email = props?.email;
    this.password = props?.password;
  }

  static mapOne(row) {
    return new UserLoginDTO(row);
  }

  static mapAll(rows) {
    return rows.map((row) => new UserLoginDTO(row));
  }
}

module.exports = UserLoginDTO;
