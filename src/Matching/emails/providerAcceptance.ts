import { emailQueue } from '../../../queue';
import UserModel from '../../User/UserModel';

export async function NotifyCompanyMatchedWithSpecification(companyId: string) {
  try {
    const companyEmailData = await UserModel.findOne(
      {
        _id: companyId,
        isActive: true,
      },
      'name email.email -_id',
    ).lean();

    if (!companyEmailData) return;

    await emailQueue.add('PROJECT_MATCHES_AGENCY', {
      receiver: [companyEmailData?.email?.email],
      title: 'You have been selected on a matching process.',
      companyName: companyEmailData?.name,
    });
  } catch (error) {
    console.log(error);
  }
}
