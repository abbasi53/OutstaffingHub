import { emailQueue } from '../../../queue';
import { AMPLIFYRE_DEV, DAVID_EMAIL } from '../../Email/sendEmail';
import UserModel from '../../User/UserModel';

export async function NotifyCompanyDeclines(companyId: string) {
  const companyEmailData = await UserModel.findOne({
    _id: companyId,
  }).lean();

  if (!companyEmailData) return;

  await emailQueue.add('AGENCY_DECLINES_MATCH', {
    receiver: [AMPLIFYRE_DEV, DAVID_EMAIL],
    companyName: companyEmailData?.name,
  });
}
