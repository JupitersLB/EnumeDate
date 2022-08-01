describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('should have a home screen', async () => {
    await expect(element(by.id('home_screen'))).toBeVisible()
  })

  it('should have an add event button', async () => {
    await expect(element(by.id('add_new_event_button'))).toBeVisible()
  })
})
