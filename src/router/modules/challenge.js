/* jshint esversion: 6 */
import ChallengeLayout from '@/components/Challenge/Layout.vue'
import ChallengeList from '@/components/Challenge/List.vue'

export default {
  path: '/challenge',
  name: 'challenge-layout',
  component: ChallengeLayout,
  children: [
    {
      path: 'list',
      name: 'challenge-list',
      component: ChallengeList
    }
  ]
}
