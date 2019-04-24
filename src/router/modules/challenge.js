/* jshint esversion: 6 */
import ChallengeLayout from '@/components/Challenge/Layout.vue'
import ChallengeSumbmit from '@/components/Challenge/SubmitFlag.vue'
import ChallengeList from '@/components/Challenge/List.vue'

export default {
  path: '/challenge',
  name: 'challenge-layout',
  component: ChallengeLayout,
  children: [
    {
      path: 'submit',
      name: 'challenge-sumbmit',
      component: ChallengeSumbmit
    },
    {
      path: 'list',
      name: 'challenge-list',
      component: ChallengeList
    }
  ]
}
