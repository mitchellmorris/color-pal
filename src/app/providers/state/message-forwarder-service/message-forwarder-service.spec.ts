import { TestBed } from '@angular/core/testing';

import { MessageForwarderService } from './message-forwarder-service';

describe('MessageForwarderService', () => {
  let service: MessageForwarderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageForwarderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
