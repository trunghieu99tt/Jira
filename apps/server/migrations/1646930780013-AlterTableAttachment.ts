import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableAttachment1646930780013 implements MigrationInterface {
  name = 'AlterTableAttachment1646930780013';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`attachments\`
            ADD \`file_name\` varchar(255) NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`attachments\` DROP COLUMN \`file_name\`
        `);
  }
}
