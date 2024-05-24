import jwt, { Secret } from 'jsonwebtoken'
import { config } from '../../server';
import { IOrganizer } from '../../../app/interfaces/IOrganizer';

export default (data: Partial<IOrganizer>): String => {

  const payload = {
    _id: data._id,
    business: data.business,
  };

  // token generating
  const token = jwt.sign(
    payload,
    config.TOKEN_SECRET as Secret,
    { expiresIn: config.TOKEN_SECRET_EXP }
  );

  return token;
};