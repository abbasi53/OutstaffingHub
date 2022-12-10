import { Types } from 'mongoose';
import { emailQueue } from '../../../queue';
import { DAVID_EMAIL } from '../../Email/sendEmail';
import UserModel from '../../User/UserModel';

export async function NotifyCompanyChosenOnMatching(
  companyId: Types.ObjectId,
  clientId: Types.ObjectId,
  projectName: string,
) {
  const companyData = await UserModel.findOne(
    { _id: companyId },
    '-_id name email', // selected fields
  ).lean();

  if (!companyData) return;

  const clientData = await UserModel.findOne({ _id: clientId }, '-_id name');

  if (!clientData) return;

  // send email to agency notifying that client chooses it.
  await emailQueue.add('AGENCY_CHOSEN_MATCHING', {
    receiver: [DAVID_EMAIL, companyData?.email.email || ''],
    client: clientData?.name || '',
    projectName,
    agencyName: companyData?.name,
  });
}
