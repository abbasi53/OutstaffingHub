import { emailQueue } from '../../../queue';
import { AMPLIFYRE_DEV } from '../../Email/sendEmail';
import { ISpecification } from '../../Specification/SpecificationModel';
import UserModel from '../../User/UserModel';

export async function NotifyClientMatchesReady(specification: ISpecification) {
  const clientEmailData = await UserModel.findOne(
    {
      _id: specification?.owner,
    },
    'name email.email -_id',
  ).lean();

  if (!clientEmailData) return;

  await emailQueue.add('PROJECT_MATCHES', {
    receiver: [AMPLIFYRE_DEV, clientEmailData?.email?.email],
    client: clientEmailData?.name,
    projectName: specification?.projectType?.projectName,
    link: 'https://www.amplifyre.com/login',
  });
}
